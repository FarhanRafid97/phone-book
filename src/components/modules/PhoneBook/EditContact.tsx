import Container from '@/components/Ui/Container';
import Input from '@/components/Ui/Input';
import Modal from '@/components/Ui/Modal';
import React from 'react';

interface IEditContactProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditContact: React.FC<IEditContactProps> = ({
  isOpenModal,
  setIsOpenModal,
}) => {
  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <Container>
        <Input />
      </Container>
    </Modal>
  );
};

export default EditContact;
