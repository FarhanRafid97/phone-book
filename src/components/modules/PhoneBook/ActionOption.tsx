import Modal from '@/components/Ui/Modal';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { FileEdit, MoreVertical, Search, Star, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import EditContact from './EditContact';
import ModalForDetailUser from './ModalForDetailUser';
import DeleteContact from './DeleteContact';
interface IActionOptionProps {
  contact: BaseContact;
}
const ActionOption: React.FC<IActionOptionProps> = ({ contact }) => {
  const refDropdown = useRef(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDetailUser, setIsOpenModalDetailUser] = useState(false);
  const [isOpenDialogDeleteContact, setIsOpenDialogDeleteContact] =
    useState(false);
  useOutsideClick({
    isOpen: isOpenDropDown,
    setIsOpen: setIsOpenDropDown,
    ref: refDropdown,
  });
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        onClick={() => setIsOpenDropDown(true)}
        css={css`
          cursor: pointer;
        `}
      >
        <MoreVertical color="white" />
      </div>
      {isOpenDropDown ? (
        <div
          onClick={() => {
            setTimeout(() => {
              setIsOpenDropDown(false);
            }, 50);
          }}
          ref={refDropdown}
          css={dropDownstyle}
        >
          <div
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            <FileEdit />
            <p>Edit</p>
          </div>

          <div
            onClick={() => {
              setIsOpenModalDetailUser(true);
            }}
          >
            <Search />
            <p>Detail</p>
          </div>

          <div onClick={() => setIsOpenDialogDeleteContact(true)}>
            <Trash2 /> <p>Delete</p>
          </div>
          <div
            onClick={() => {
              const data = localStorage.getItem('favorite');
              let tempFavorite = [];
              if (data) {
                try {
                  tempFavorite = JSON.parse(data);
                  if (!Array.isArray(tempFavorite)) {
                    tempFavorite = []; // If it's not an array, initialize as an empty array
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', error);
                }
              }
              console.log(tempFavorite);

              // Now you can add the new item to tempFavorite and update the localStorage
              tempFavorite.push(contact);
              localStorage.setItem('favorite', JSON.stringify(tempFavorite));
            }}
          >
            <Star />
            <p>Favorite</p>
          </div>
        </div>
      ) : null}
      {isOpenModal ? (
        <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
          <EditContact contact={contact} />
        </Modal>
      ) : null}
      {isOpenModalDetailUser ? (
        <ModalForDetailUser
          isOpenModal={isOpenModalDetailUser}
          setIsOpenModal={setIsOpenModalDetailUser}
          contact={contact}
        />
      ) : null}
      {isOpenDialogDeleteContact ? (
        <DeleteContact
          contact={contact}
          isOpen={isOpenDialogDeleteContact}
          setIsOpen={setIsOpenDialogDeleteContact}
        />
      ) : null}
    </div>
  );
};

const dropDownstyle = css`
  position: absolute;
  right: 0;
  background-color: #1d1d1d;
  z-index: 99;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    padding: 10px 15px;

    min-width: 180px;

    color: white;
    &:hover {
      background-color: rgb(128, 128, 128, 0.3);
    }
  }
`;

export default ActionOption;
