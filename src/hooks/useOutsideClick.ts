import React, { useEffect } from 'react';

interface ValidRefTarget {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  contains(target: EventTarget | null): any;
}
interface IUseOutsideClick {
  ref: React.RefObject<ValidRefTarget>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function useOutsideClick({ isOpen, ref, setIsOpen }: IUseOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isOpen, setIsOpen]);
}
