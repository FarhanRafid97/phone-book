import { css } from '@emotion/react';
import React, { forwardRef } from 'react';
import Spinner from './Spinner';

const buttonColor = {
  red: '#af2626',
  gray: '#5d5d5d',
  blue: '#5485d9',
  green: '#4caf50',
} as const;
const buttonColorHover = {
  red: '#812222',
  gray: '#858585',
  blue: '#2e77f6',
  green: '#26a92b',
} as const;

type ButtonColor = typeof buttonColor;
type ButtonTypesProps = {
  variant?: keyof ButtonColor;
  children: React.ReactNode;
  isFull?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const Button: React.FC<ButtonTypesProps> = forwardRef<
  HTMLButtonElement,
  ButtonTypesProps
>(({ variant = 'gray', isFull, isLoading, children, ...props }, ref) => {
  const ButtonDialog = css`
    border: none;
    padding: 7px 10px;
    border-radius: 7px;
    width: ${isFull ? '100%' : 'fit-content'};

    cursor: pointer;
    background-color: ${buttonColor[variant]};
    color: white;
    &:hover {
      background-color: ${buttonColorHover[variant]};
    }
  `;
  return (
    <button css={ButtonDialog} ref={ref} {...props}>
      {isLoading ? <Spinner size={14} color="white" /> : children}
    </button>
  );
});
Button.displayName = 'Button';
export default Button;
