import Modal from '@/components/Ui/Modal';
import { BaseContact } from '@/types/Contact';
import { useState } from 'react';
import DetailUser from './DetailUser';

import { css } from '@emotion/react';
import { FileEdit, Search } from 'lucide-react';
import EditContact from './EditContact';
import Button from '@/components/Ui/Button';
import { headerActionModal } from '@/styles/emotion/general';
interface ModalForDetailUserProps {
  contact: BaseContact;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalForDetailUser: React.FC<ModalForDetailUserProps> = ({
  contact,
  isOpenModal,
  setIsOpenModal,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <div>
        <div css={headerActionModal}>
          {!isEdit ? (
            <button onClick={() => setIsEdit(true)} css={ButtonEditContact}>
              <FileEdit size={14} />
              <p>Edit</p>
            </button>
          ) : (
            <button onClick={() => setIsEdit(false)} css={ButtonEditContact}>
              <Search size={14} />
              <p>Detail</p>
            </button>
          )}
          <Button variant="red" onClick={() => setIsOpenModal(false)}>
            Close
          </Button>
        </div>
        {isEdit ? (
          <EditContact contact={contact} />
        ) : (
          <DetailUser contact={contact} />
        )}
      </div>
    </Modal>
  );
};
const ButtonEditContact = css`
  border: none;
  display: flex;
  color: white;
  align-items: center;
  gap: 5px;
  padding: 8px 10px;
  border-radius: 7px;
  background-color: rgb(255, 255, 255, 0.15);
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 255, 255, 0.35);
  }
`;

export default ModalForDetailUser;
