import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface ContainerNavFoot {
  children: ReactNode;
}

const ContainerNavFoot: React.FC<ContainerNavFoot> = ({ children }) => {
  return <section css={containerStyle}>{children}</section>;
};

export default ContainerNavFoot;

const containerStyle = css`
  width: 480px;
  display: flex;

  width: 480px;
  padding: 20px 10px;
  margin: auto;
  @media (max-width: 500px) {
    padding: 15px 32px;

    width: 100%;
  }
`;
