import { css } from '@emotion/react';
import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';

type ISearchInputProps = {
  isErrorForm?: boolean;
  disabled?: boolean;
  isFetching?: boolean;
} & React.ComponentPropsWithRef<'input'>;

const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(
  ({ ...props }, ref) => {
    return (
      <div css={containerSearchStyle}>
        <input css={inputStyle} ref={ref} type="text" {...props} />
        <div>
          <div css={SearchIconStyle}>
            <Search color="black" />
          </div>
        </div>
      </div>
    );
  },
);
const SearchIconStyle = css`
  position: absolute;
  left: 0.75rem;
  top: 50%;

  transform: translateY(-50%);
  cursor: pointer;
`;

const containerSearchStyle = css`
  position: relative;
  width: fit-content;

  display: flex;
  width: 100%;
  margin-bottom: 15px;
`;
const inputStyle = css`
  border: 1px solid black;
  padding: 9px 44px;
  border-radius: 7px;
  flex: 1;
  background-color: #dbdbdb;

  &:focus {
    outline: none;
  }
`;
SearchInput.displayName = 'SearchInput';
export default SearchInput;
