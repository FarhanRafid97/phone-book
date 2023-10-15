import Button from '@/components/Ui/Button';
import Container from '@/components/Ui/Container';
import Input from '@/components/Ui/Input';
import Modal from '@/components/Ui/Modal';
import { BaseContact, PhonesInput } from '@/types/Contact';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Plus, Trash } from 'lucide-react';

import { useAddContactWithPhonesMutation } from '@/gql/file';
import { useReactiveVar } from '@apollo/client';
import { OffsetVar } from '@/App';
interface AddNewContactProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewContact: React.FC<AddNewContactProps> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    unregister,
    handleSubmit,
    reset,

    control,
    formState: { isLoading, errors },
  } = useForm<BaseContact>({ defaultValues: { phones: [{ number: '' }] } });
  const [error, setError] = useState('');
  const [addContact] = useAddContactWithPhonesMutation();
  const [phonesInput, setPhonesInput] = useState<PhonesInput[]>([
    { number: '' },
  ]);

  const { fields, append, remove } = useFieldArray({ control, name: 'phones' });

  const offset = useReactiveVar(OffsetVar);

  const onSubmit = async (data: BaseContact) => {
    setError('');

    try {
      await addContact({
        variables: { ...data, phones: data.phones },
        update: (cache, { data }) => {
          return cache.modify({
            fields: {
              contact(existing): BaseContact[] {
                if (offset !== 0) {
                  return existing;
                }
                const contactTemp = (data?.insert_contact?.returning ??
                  []) as BaseContact[];
                return [...contactTemp, ...existing];
              },
            },
          });
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes('duplicate')) {
        setError('Duplicate Phone Number');
      }
    } finally {
      reset();
    }
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h1
          css={css`
            margin-bottom: 15px;
            font-weight: 800;
            color: white;
            font-size: 24px;
          `}
        >
          Add New Contact
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div css={containerFormAddContact}>
            <label htmlFor="">
              <span
                css={css`
                  color: white;
                `}
              >
                {' '}
                First Name
              </span>
              <Input
                {...register('first_name', {
                  required: { value: true, message: 'Field Required' },
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message:
                      'Please enter only alphabet characters. Special characters and symbols are not allowed.',
                  },
                })}
              />
              {errors.first_name ? (
                <span css={errorMessage}>{errors.first_name?.message}</span>
              ) : null}
            </label>
            <label htmlFor="">
              <span
                css={css`
                  color: white;
                `}
              >
                Last Name
              </span>
              <Input
                {...register('last_name', {
                  required: { value: true, message: 'Field Required' },
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message:
                      'Please enter only alphabet characters. Special characters and symbols are not allowed.',
                  },
                })}
              />
              {errors.last_name ? (
                <span css={errorMessage}>{errors.last_name?.message}</span>
              ) : null}
            </label>

            {fields.map((field, i) => (
              <label css={wraperInput} key={field.id}>
                <span
                  css={css`
                    color: white;
                  `}
                >
                  #{i + 1}.Phonenumber{' '}
                  {fields.length > 1 ? (
                    <Trash
                      onClick={() => {
                        unregister(`phones.${i}.number`);
                        remove(i);
                        const filteredPhones = phonesInput.filter(
                          (_, idx) => idx != i,
                        );
                        setPhonesInput(filteredPhones);
                      }}
                      size={14}
                      color="red"
                    />
                  ) : null}
                </span>
                <Input
                  key={field.id}
                  {...register(`phones.${i}.number`, {
                    required: { value: true, message: 'Field Required' },
                    pattern: {
                      value: /^(?:\+\d+|\d+)$/,
                      message: 'Invalid Phone Number',
                    },
                  })}
                />
                {errors.phones?.[i]?.number ? (
                  <span css={errorMessage}>
                    {errors.phones?.[i]?.number?.message}
                  </span>
                ) : null}
              </label>
            ))}
            <Button
              variant="green"
              type="button"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => {
                append({ number: '' });
              }}
            >
              <Plus />
            </Button>
          </div>

          <div
            css={css`
              margin-top: 20px;
              width: 100%;
              display: flex;
              gap: 15px;
            `}
          >
            {error ? <p css={errorMessage}>{error}</p> : null}
            <Button isFull variant="blue">
              Save
            </Button>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              isFull
              variant="gray"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Container>
    </Modal>
  );
};
const errorMessage = css`
  color: #e75757;
  font-size: 12px;
`;

const containerFormAddContact = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    > span {
      font-size: 14px;
    }
  }
`;

const wraperInput = css`
  display: flex;
  width: 100%;
  flex-direction: column;

  gap: 5px;
`;

export default AddNewContact;
