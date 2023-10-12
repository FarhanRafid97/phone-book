import { css } from '@emotion/react';
import React, { forwardRef } from 'react';

type IInputProps = {
  isErrorForm?: boolean;
  disabled?: boolean;
  isFetching?: boolean;
} & React.ComponentPropsWithRef<'input'>;

const Input = forwardRef<HTMLInputElement, IInputProps>(({ ...props }, ref) => {
  return <input css={inputStyle} ref={ref} type="text" {...props} />;
});

const inputStyle = css`
  border: 1px solid black;
  padding: 6px 24px;
  border-radius: 7px;

  background-color: #dbdbdb;

  &:focus {
    outline: none;
  }
`;
Input.displayName = 'Input';
export default Input;
