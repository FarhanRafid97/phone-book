import Modal from '@/components/Ui/Modal';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import {
  FileEdit,
  MoreVertical,
  Search,
  Star,
  Trash,
  Trash2,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import EditContact from './EditContact';
import ModalForDetailUser from './ModalForDetailUser';
import DeleteContact from './DeleteContact';
import { addToFavorite } from '@/utils/addToFavorite';
import { removeFromFavorite } from '@/utils/removeFromFavorite';
import { useReactiveVar } from '@apollo/client';
import { OffsetVar } from '@/App';
interface IActionOptionProps {
  contact: BaseContact;
  isFavoriteList?: boolean;
}
const ActionOption: React.FC<IActionOptionProps> = ({
  contact,
  isFavoriteList,
}) => {
  const offset = useReactiveVar(OffsetVar);
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
              if (isFavoriteList) {
                removeFromFavorite({ contact, isFirstPage: offset === 0 });
                console.log('remove');
              } else {
                console.log('add');
                addToFavorite({ contact });
              }
            }}
          >
            {isFavoriteList ? <Trash /> : <Star />}
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
  z-index: 9999;
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
