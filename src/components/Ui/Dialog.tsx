import { useOutsideClick } from '@/hooks/useOutsideClick';
import { css } from '@emotion/react';
import React, { ReactNode, useEffect, useRef } from 'react';
interface IDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
const Dialog: React.FC<IDialogProps> = ({ isOpen, setIsOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
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
    margin: auto;

    width: 100%;
    background-color: transparent;
    min-height: 100px;
  }
`;

export default Dialog;
