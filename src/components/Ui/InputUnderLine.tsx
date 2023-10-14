import { css } from '@emotion/react';
import React, { forwardRef } from 'react';

type IInputUnderlineProps = {
  isErrorForm?: boolean;
  disabled?: boolean;
  isFetching?: boolean;
} & React.ComponentPropsWithRef<'input'>;

const InputUnderline = forwardRef<HTMLInputElement, IInputUnderlineProps>(
  ({ ...props }, ref) => {
    return <input css={inputStyle} ref={ref} type="text" {...props} />;
  },
);

const inputStyle = css`
  border: 1px solid black;

  border: none;
  background-color: transparent;
  border-bottom: 1px solid #dbdbdb;
  color: white;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;
InputUnderline.displayName = 'InputUnderline';
export default InputUnderline;
