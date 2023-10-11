import { css } from '@emotion/react';
const Navbar: React.FC = () => {
  return (
    <nav
      css={css`
        position: fixed;
        width: 100%;
        padding: 10px;
        top: 0px;
      `}
    >
      Navbar
    </nav>
  );
};

export default Navbar;
