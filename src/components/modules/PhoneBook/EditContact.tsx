import Button from '@/components/Ui/Button';
import Container from '@/components/Ui/Container';
import Input from '@/components/Ui/Input';
import Spinner from '@/components/Ui/Spinner';
import {
  useEditContactByIdMutation,
  useEditPhoneNumberMutation,
} from '@/gql/file';
import { errorMessage } from '@/styles/emotion/addnewContactStyle';

import {
  ButtonSave,
  ContainerFormInput,
  InputWrapperStyle,
} from '@/styles/emotion/editContactStyle';
import { BaseContact } from '@/types/Contact';
import { editFromLocalStorage } from '@/utils/editFromLocalStorage';
import { css } from '@emotion/react';
import { FileEdit } from 'lucide-react';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface IEditContactProps {
  contact: BaseContact;
}
const EditContact: React.FC<IEditContactProps> = ({ contact }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    control,
    getValues,
    formState: { errors },
  } = useForm<BaseContact>({
    values: contact,
  });
  console.log(getValues());

  const { fields } = useFieldArray({ control, name: 'phones' });
  const [editPhoneNumber] = useEditPhoneNumberMutation();
  const [editContactById] = useEditContactByIdMutation();

  const [editedPhoneIndex, seteditedPhoneIndex] = useState(-1);
  const [oldPhoneNumber, setOldPhoneNumber] = useState('');
  const [isEditBasicInfo, setIsEditBasicInfo] = useState(false);
  const [phoneRef, setPhoneRef] = useState<React.RefObject<HTMLInputElement>[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);

  const watchFirstName = watch('first_name');
  const watchLastName = watch('last_name');

  useEffect(() => {
    if (contact) {
      setPhoneRef(contact.phones.map(() => createRef<HTMLInputElement>()));
    }
  }, [contact]);

  const onsubmitBasicInfo = async (data: BaseContact) => {
    setIsLoading(true);
    try {
      await editContactById({
        variables: {
          id: contact.id,
          _set: {
            first_name: data.first_name,
            last_name: data.last_name,
            updated_at: new Date(),
          },
        },
        update(cache) {
          cache.modify({
            id: cache.identify({ __typename: 'contact', id: contact.id }),
            fields: {
              first_name(): string {
                return data.first_name;
              },
              last_name(): string {
                return data.last_name;
              },
            },
          });
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes('duplicate')) {
        setError(`phones.${editedPhoneIndex}.number`, {
          message: 'Duplicate Phone Number',
        });
      }
    } finally {
      setIsLoading(false);
      editFromLocalStorage({ contact: data });
      setIsEditBasicInfo(false);
    }
  };

  const onSubmitPhone = async (data: BaseContact) => {
    setIsLoading(true);
    try {
      await editPhoneNumber({
        variables: {
          pk_columns: {
            number: oldPhoneNumber,
            contact_id: contact.id,
          },
          new_phone_number: data.phones[editedPhoneIndex].number,
        },
        update(cache) {
          cache.modify({
            id: cache.identify({ __typename: 'contact', id: contact.id }),
            fields: {
              phones(existingPhone): { number: string; __typename: string }[] {
                const newData = [];
                const edited = [];
                for (let i = 0; i < existingPhone.length; i++) {
                  if (existingPhone[i].number === oldPhoneNumber) {
                    edited.push({
                      __typename: 'phone',
                      number: data.phones[editedPhoneIndex].number,
                    });
                  } else {
                    newData.push(existingPhone[i]);
                  }
                }
                return [...newData, ...edited];
              },
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      editFromLocalStorage({ contact: data });
      seteditedPhoneIndex(-1);
      setOldPhoneNumber('');
    }
  };
  return (
    <Container>
      <h1
        css={css`
          margin-bottom: 15px;
          font-weight: 800;
          color: white;
          font-size: 24px;
        `}
      >
        Edit Contact {`${contact.first_name} ${contact.last_name}`}
      </h1>
      <div
        css={css`
          max-height: 50vh;
          overflow-y: auto;
          padding-bottom: 15px;
          p {
            color: white;
          }
        `}
      >
        <div css={InputWrapperStyle}>
          <form
            className="wrapper-edit-contact"
            onSubmit={handleSubmit(onsubmitBasicInfo)}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 100%;
              `}
            >
              <label css={ContainerFormInput}>
                <p>First Name</p>
                <Input
                  {...register('first_name', {
                    required: { value: true, message: 'Field Required' },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message:
                        'Please enter only alphabet characters. Special characters and symbols are not allowed.',
                    },
                  })}
                  disabled={!isEditBasicInfo}
                  value={watchFirstName}
                  name="first_name"
                  onChange={(e) => setValue('first_name', e.target.value)}
                />
                {errors.first_name ? (
                  <span css={errorMessage}>{errors.first_name?.message}</span>
                ) : null}
              </label>
              <label css={ContainerFormInput}>
                <p>Last Name</p>
                <Input
                  {...register('last_name', {
                    required: { value: true, message: 'Field Required' },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message:
                        'Please enter only alphabet characters. Special characters and symbols are not allowed.',
                    },
                  })}
                  disabled={!isEditBasicInfo}
                  value={watchLastName}
                  name="last_name"
                  onChange={(e) => setValue('last_name', e.target.value)}
                />
                {errors.last_name ? (
                  <span css={errorMessage}>{errors.last_name?.message}</span>
                ) : null}
              </label>
              {isEditBasicInfo ? (
                <div className="wrapper-is-edit-button">
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    variant="green"
                    disabled={isLoading}
                    css={ButtonSave}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="gray"
                    onClick={() => {
                      setIsEditBasicInfo(false);
                      clearErrors();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  isFull
                  onClick={() => {
                    setIsEditBasicInfo(true);
                    seteditedPhoneIndex(-1);
                    setTimeout(() => {
                      firstNameRef.current?.focus();
                    }, 50);
                  }}
                  variant="blue"
                >
                  Edit Basic Info
                </Button>
              )}
            </div>
          </form>

          <div className="wrapper-edit-phones">
            {fields.map((phone, i) => {
              const reInput = phoneRef[i];
              return (
                <form key={phone.id} onSubmit={handleSubmit(onSubmitPhone)}>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;

                      width: 100%;
                    `}
                  >
                    <label css={ContainerFormInput}>
                      <p className="label-input">Phone #{i + 1}</p>

                      <Input
                        key={phone.id}
                        {...register(`phones.${i}.number`, {
                          required: { value: true, message: 'Field Required' },
                          pattern: {
                            value: /^(?:\+\d+|\d+)$/,
                            message: 'Invalid Phone Number',
                          },
                        })}
                        disabled={i !== editedPhoneIndex}
                      />
                      {errors.phones?.[i]?.number ? (
                        <span css={errorMessage}>
                          {errors.phones?.[i]?.number?.message}
                        </span>
                      ) : null}
                    </label>
                    {editedPhoneIndex === i ? (
                      <div className="wrapper-is-edit-button">
                        <button
                          type="submit"
                          disabled={isLoading}
                          css={ButtonSave}
                        >
                          {isLoading ? <Spinner size={14} /> : '  Save'}
                        </button>
                        <Button
                          variant="gray"
                          type="button"
                          onClick={() => seteditedPhoneIndex(-1)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        isFull
                        variant="blue"
                        type="button"
                        onClick={() => {
                          setOldPhoneNumber(phone.number);
                          seteditedPhoneIndex(i);
                          setTimeout(() => {
                            reInput.current?.focus();
                          }, 50);
                        }}
                      >
                        <FileEdit size={14} /> Edit Phone
                      </Button>
                    )}
                  </div>
                </form>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditContact;
