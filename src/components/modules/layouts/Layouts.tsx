import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { css } from '@emotion/react';

interface ILayoutsProps {
  children: ReactNode;
}
const Layouts: React.FC<ILayoutsProps> = ({ children }) => {
  return (
    <>
      <Navbar />{' '}
      <main
        css={css`
          padding: 80px 0px;
        `}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layouts;
