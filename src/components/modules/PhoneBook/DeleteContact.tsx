import Button from '@/components/Ui/Button';
import Dialog from '@/components/Ui/Dialog';
import Spinner from '@/components/Ui/Spinner';
import {
  GetContactListDocument,
  GetContactListQuery,
  useDeleteContactByPkMutation,
} from '@/gql/file';

import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { useState } from 'react';

interface DeleteContactProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contact: BaseContact;
}

const DeleteContact: React.FC<DeleteContactProps> = ({
  isOpen,
  setIsOpen,
  contact,
}) => {
  const [deleteContact] = useDeleteContactByPkMutation();
  const [loading, setLoading] = useState(false);
  const onDeletContact = () => {
    setLoading(true);
    try {
      deleteContact({
        variables: { id: contact.id },

        update: (cache) => {
          const normalizedId = cache.identify({
            __ref: 'contact:' + contact.id,
          });
          const data = cache.readQuery<GetContactListQuery>({
            query: GetContactListDocument,
          });
          console.log(data);
          cache.modify({
            id: normalizedId,
            fields: (_, { DELETE }) => DELETE,
          });
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <div css={containerDeleteContact}>
        <h1>
          Are You Sure want delete{' '}
          <span>{`${contact.first_name} ${contact.last_name} `}</span>
          From Contact
        </h1>
        <div css={wrapperDialogButton}>
          <Button onClick={onDeletContact} variant="red">
            {loading ? <Spinner size={14} color="white" /> : 'Delete'}
          </Button>
          <Button
            variant="gray"
            onClick={() => setIsOpen(false)}
            css={CancelButton}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const wrapperDialogButton = css`
  display: flex;
  justify-content: end;
  margin-top: 40px;
  gap: 10px;
`;

const CancelButton = css`
  border: none;
  padding: 7px 10px;
  border-radius: 7px;
  width: fit-content;

  cursor: pointer;
  background-color: #5d5d5d;
  color: white;
  &:hover {
    background-color: #858585;
  }
`;
const containerDeleteContact = css`
  width: 580px;
  margin: 0px auto;
  padding: 32px 2px;

  background-color: #1f2738;
  padding: 50px;

  border-radius: 12px;
  > h1 {
    font-size: 18px;
    color: white;
    > span {
      color: red;
    }
  }
  @media (max-width: 500px) {
    width: 90vw;
    padding: 32px 32px;
  }
`;

export default DeleteContact;
