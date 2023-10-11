import { css } from '@emotion/react';
import React from 'react';

const Footer = () => {
  return (
    <footer
      css={css`
        position: fixed;
        width: 100%;
        padding: 10px;
        bottom: 0px;
      `}
    >
      Footer
    </footer>
  );
};

export default Footer;
