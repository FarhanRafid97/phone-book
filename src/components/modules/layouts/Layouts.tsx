import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface ILayoutsProps {
  children: ReactNode;
}

const Layouts: React.FC<ILayoutsProps> = ({ children }) => {
  return (
    <>
      <Navbar /> <main css={styleMainConent}>{children}</main>
      <Footer />
    </>
  );
};

const styleMainConent = css`
  padding: 80px 0px;
  min-height: 100vh;
`;
export default Layouts;
