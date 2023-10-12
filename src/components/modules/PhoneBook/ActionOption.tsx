import { useOutsideClick } from '@/hooks/useOutsideClick';
import { css } from '@emotion/react';
import { FileEdit, MoreVertical, Star, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import EditContact from './EditContact';
const ActionOption = () => {
  const refDropdown = useRef(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
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
        <div ref={refDropdown} css={dropDownstyle}>
          <div
            onClick={() => {
              setIsOpenModal(true);

              setIsOpenDropDown(false);
            }}
          >
            <FileEdit />
            <p>Edit</p>
          </div>
          <div>
            <Trash2 /> <p>Delete</p>
          </div>
          <div>
            <Star />
            <p>Favorite</p>
          </div>
        </div>
      ) : null}
      {isOpenModal ? (
        <EditContact
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      ) : null}
    </div>
  );
};

const dropDownstyle = css`
  position: absolute;
  right: 0;
  background-color: #242f43;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    padding: 10px 15px;
    min-width: 130px;
    color: white;
    &:hover {
      background-color: rgb(128, 128, 128, 0.3);
    }
  }
`;

export default ActionOption;
