import { OffsetVar } from '@/App';
import Button from '@/components/Ui/Button';
import Modal from '@/components/Ui/Modal';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { headerActionModal } from '@/styles/emotion/general';
import { BaseContact } from '@/types/Contact';
import { addToFavorite } from '@/utils/addToFavorite';
import { removeFromFavorite } from '@/utils/removeFromFavorite';
import { useReactiveVar } from '@apollo/client';
import { css } from '@emotion/react';
import { FileEdit, MoreVertical, Search, Star, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';
import ModalForDetailUser from './ModalForDetailUser';
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
          padding: 5px;
          background-color: rgb(255, 255, 255, 0.2);
          border-radius: 7px;
          &:hover {
            background-color: rgb(255, 255, 255, 0.1);
            cursor: pointer;
          }
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
            <Search size={22} />
            <p>Detail</p>
          </div>

          <div onClick={() => setIsOpenDialogDeleteContact(true)}>
            <Trash2 /> <p>Delete</p>
          </div>
          <div
            onClick={() => {
              if (isFavoriteList) {
                removeFromFavorite({ contact, isFirstPage: offset === 0 });
              } else {
                addToFavorite({ contact });
              }
            }}
          >
            <Star />
            <p>{isFavoriteList ? 'Remove Favorite' : 'Favorite'}</p>
          </div>
        </div>
      ) : null}
      {isOpenModal ? (
        <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
          <div css={headerActionModal}>
            <Button variant="red" onClick={() => setIsOpenModal(false)}>
              Close
            </Button>
          </div>
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
  overflow: auto;
  background-color: #1d1d1d;
  z-index: 9999;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
    padding: 10px 15px;
    font-size: 14px;
    min-width: 180px;
    color: white;
    &:hover {
      background-color: rgb(128, 128, 128, 0.3);
    }
  }
`;

export default ActionOption;
