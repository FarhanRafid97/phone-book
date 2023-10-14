import Container from '@/components/Ui/Container';
import Input from '@/components/Ui/Input';
import Spinner from '@/components/Ui/Spinner';
import {
  useEditContactByIdMutation,
  useEditPhoneNumberMutation,
} from '@/gql/file';
import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { FileEdit } from 'lucide-react';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IEditContactProps {
  contact: BaseContact;
}
const EditContact: React.FC<IEditContactProps> = ({ contact }) => {
  const { handleSubmit, setValue, watch } = useForm<BaseContact>({
    values: contact,
  });

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

  const watchPhone = watch('phones');
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      seteditedPhoneIndex(-1);
      setOldPhoneNumber('');
    }
  };
  return (
    <Container>
      <h1
        css={css`
          color: white;
          font-weight: 500;
          margin-bottom: 15px;
          font-size: 28px;
          text-align: center;
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
                  ref={firstNameRef}
                  disabled={!isEditBasicInfo}
                  value={watchFirstName}
                  name="first_name"
                  onChange={(e) => setValue('first_name', e.target.value)}
                />
              </label>
              <label css={ContainerFormInput}>
                <p>Last Name</p>
                <Input
                  disabled={!isEditBasicInfo}
                  value={watchLastName}
                  name="last_name"
                  onChange={(e) => setValue('last_name', e.target.value)}
                />
              </label>
              {isEditBasicInfo ? (
                <div className="wrapper-is-edit-button">
                  <button type="submit" disabled={isLoading} css={ButtonSave}>
                    {isLoading ? <Spinner size={14} /> : '  Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditBasicInfo(false)}
                    css={ButtonCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsEditBasicInfo(true);
                    setTimeout(() => {
                      firstNameRef.current?.focus();
                    }, 50);
                  }}
                  css={ButtonEditContact}
                >
                  Edit Basic Info
                </button>
              )}
            </div>
          </form>

          <div className="wrapper-edit-phones">
            {contact.phones.map((phone, i) => {
              const reInput = phoneRef[i];
              return (
                <form key={i} onSubmit={handleSubmit(onSubmitPhone)}>
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
                        ref={reInput}
                        value={watchPhone[i].number}
                        onChange={(e) =>
                          setValue(`phones.${i}.number`, e.target.value)
                        }
                        disabled={i !== editedPhoneIndex}
                      />
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
                        <button
                          type="button"
                          onClick={() => seteditedPhoneIndex(-1)}
                          css={ButtonCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOldPhoneNumber(phone.number);
                          seteditedPhoneIndex(i);
                          setTimeout(() => {
                            reInput.current?.focus();
                          }, 50);
                        }}
                        css={ButtonEditContact}
                      >
                        <FileEdit size={14} /> Edit Phone
                      </button>
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

export const ButtonEditContact = css`
  border: none;
  padding: 7px 0;

  border-radius: 7px;
  cursor: pointer;
  background-color: #0e1c36;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  &:hover {
    background-color: rgb(143, 143, 143);
  }
`;
export const ButtonCancel = css`
  border: none;
  padding: 7px 15px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #c02121;

  color: white;
  &:hover {
    background-color: rgb(143, 143, 143);
  }
`;
export const ButtonSave = css`
  border: none;
  padding: 7px 10px;
  border-radius: 7px;
  width: fit-content;
  cursor: pointer;
  background-color: #26af5f;
  color: white;
  &:hover {
    background-color: rgb(143, 143, 143);
  }
`;
export const InputWrapperStyle = css`
  z-index: 99;
  width: 100%;

  flex-direction: column;
  gap: 40px;
  display: flex;

  .wrapper-edit-contact {
    flex-direction: column;
    gap: 10px;
    display: flex;
    .form-edit-phone {
      display: flex;
      flex-direction: column;
      width: 100%;
      p {
        color: white;
      }
    }
  }
  .wrapper-edit-phones {
    flex-direction: column;
    gap: 10px;
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
      width: 100%;
      p {
        color: white;
      }
    }
  }
`;

export const ContainerFormInput = css`
  display: flex;
  flex-direction: column;

  gap: 5px;
  margin-bottom: 5px;
`;
export default EditContact;
