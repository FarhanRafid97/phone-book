import Container from '@/components/Ui/Container';
import Input from '@/components/Ui/Input';
import Modal from '@/components/Ui/Modal';
import Spinner from '@/components/Ui/Spinner';
import { useEditPhoneNumberMutation } from '@/gql/file';
import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { FileEdit } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IEditContactProps {
  isOpenModal: boolean;
  contact: BaseContact;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditContact: React.FC<IEditContactProps> = ({
  isOpenModal,
  setIsOpenModal,
  contact,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<BaseContact>({
    values: contact,
  });
  const watchPhone = watch('phones');
  const [editedPhoneIndex, seteditedPhoneIndex] = useState(-1);
  const [editPhoneNumber] = useEditPhoneNumberMutation();
  const [oldPhoneNumber, setOldPhoneNumber] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const onSubmitPhone = async (data: BaseContact) => {
    setIsloading(true);
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
      setIsloading(false);
      seteditedPhoneIndex(-1);
      setOldPhoneNumber('');
    }
  };
  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <Container>
        <div
          css={css`
            max-height: 50vh;
            overflow-y: auto;
            padding-bottom: 15px;
          `}
        >
          <div css={inputWrapperStyle}>
            <form
              className="wrapper-edit-contact"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <p>First Name</p>
                <Input {...register('first_name')} />
              </div>
              <div>
                <p>Last Name</p>
                <Input {...register('last_name')} />
              </div>
              <button css={buttonEditContact}>Edit Contact</button>
            </form>

            <div className="wrapper-edit-phones">
              {contact.phones.map((phone, i) => (
                <form key={i} onSubmit={handleSubmit(onSubmitPhone)}>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      width: 100%;
                    `}
                    className="form-edit-phone"
                  >
                    <label
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        margin-bottom: 5px;
                      `}
                    >
                      <p className="label-input">Phone #{i + 1}</p>
                    </label>
                    <Input
                      value={watchPhone[i].number}
                      onChange={(e) =>
                        setValue(`phones.${i}.number`, e.target.value)
                      }
                      disabled={i !== editedPhoneIndex}
                    />
                    {editedPhoneIndex === i ? (
                      <div className="wrapper-is-edit-button">
                        <button type="submit" css={buttonSave}>
                          {isLoading ? <Spinner size={14} /> : '  Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => seteditedPhoneIndex(-1)}
                          css={buttonCancel}
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
                            setFocus(`phones.${i}.number`);
                          }, 200);
                        }}
                        css={buttonEditContact}
                      >
                        <FileEdit size={14} /> Edit Phone
                      </button>
                    )}
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

const buttonEditContact = css`
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
const buttonCancel = css`
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
const buttonSave = css`
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
const inputWrapperStyle = css`
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
export default EditContact;
