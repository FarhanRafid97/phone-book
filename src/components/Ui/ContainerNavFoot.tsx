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
  justify-content: space-between;
  width: 480px;
  padding: 20px 10px;

  margin: auto;
`;
