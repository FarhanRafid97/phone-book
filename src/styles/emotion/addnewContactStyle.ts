import { css } from '@emotion/react';

export const errorMessage = css`
  color: #e75757;
  font-size: 12px;
`;

export const containerFormAddContact = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    > span {
      font-size: 14px;
    }
  }
`;

export const wraperInput = css`
  display: flex;
  width: 100%;
  flex-direction: column;

  gap: 5px;
`;
