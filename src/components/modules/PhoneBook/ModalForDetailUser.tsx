import Modal from '@/components/Ui/Modal';
import { BaseContact } from '@/types/Contact';
import { useState } from 'react';
import DetailUser from './DetailUser';

import { css } from '@emotion/react';
import { FileEdit, Search } from 'lucide-react';
import EditContact from './EditContact';
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
        <div css={ToggleEditAndDetailStyle}>
          {isEdit ? (
            <button onClick={() => setIsEdit(false)} css={ButtonEditContact}>
              <FileEdit />
              <p>Edit</p>
            </button>
          ) : (
            <button onClick={() => setIsEdit(true)} css={ButtonEditContact}>
              <Search />
              <p>Detail</p>
            </button>
          )}
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
  padding: 8px 10px;
  border-radius: 7px;
  background-color: rgb(255, 255, 255, 0.15);
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 255, 255, 0.35);
  }
`;

const ToggleEditAndDetailStyle = css`
  width: 480px;
  margin: 0px auto;
  padding: 10px 32px;
  display: flex;

  justify-content: end;
  @media (max-width: 500px) {
    width: 100vw;
    padding: 32px 32px;
  }
`;
export default ModalForDetailUser;
