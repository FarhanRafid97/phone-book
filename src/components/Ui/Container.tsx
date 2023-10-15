import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => {
  return <section css={containerStyle}>{children}</section>;
};

export default Container;

const containerStyle = css`
  width: 480px;
  margin: 0px auto;
  padding: 32px 2px;
  @media (max-width: 500px) {
    padding: 15px 32px;

    width: 100%;
  }
`;
