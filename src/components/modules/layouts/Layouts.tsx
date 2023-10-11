import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { css } from '@emotion/react';

interface ILayoutsProps {
  children: ReactNode;
}
const styleMainConent = css({ padding: '80px 0px', minHeight: '100vh' });

const Layouts: React.FC<ILayoutsProps> = ({ children }) => {
  return (
    <>
      <Navbar /> <main css={styleMainConent}>{children}</main>
      <Footer />
    </>
  );
};

export default Layouts;
