import { useOutsideClick } from '@/hooks/useOutsideClick';
import { css } from '@emotion/react';
import React, { ReactNode, useRef } from 'react';
interface IModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
const Modal: React.FC<IModalProps> = ({ isOpen, setIsOpen, children }) => {
  const refContent = useRef<null>(null);
  useOutsideClick({ isOpen, setIsOpen, ref: refContent });
  return (
    <div css={styleBaseModal}>
      <div className="content-modal" ref={refContent}>
        {children}
      </div>
    </div>
  );
};
const styleBaseModal = css`
  position: fixed;

  background-color: rgb(211, 211, 211, 0.2);
  top: 0;

  right: 0;
  display: flex;

  bottom: 0;
  left: 0;
  z-index: 99;
  .content-modal {
    border-top-left-radius: 15px;
    margin-top: auto;

    width: 100%;
    background-color: #1f2738;
    min-height: 100px;
  }
`;

export default Modal;
