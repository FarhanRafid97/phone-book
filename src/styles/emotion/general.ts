import { css } from '@emotion/react';

export const headerActionModal = css`
  width: 480px;
  margin: 0px auto;
  padding: 20px 0px;
  gap: 15px;
  display: flex;
  justify-content: end;
  @media (max-width: 500px) {
    width: 100%;
    padding: 15px 32px;
  }
`;
