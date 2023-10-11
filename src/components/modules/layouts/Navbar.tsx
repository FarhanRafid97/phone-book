import ContainerNavFoot from '@/components/Ui/ContainerNavFoot';
import { css } from '@emotion/react';
const Navbar: React.FC = () => {
  return (
    <nav
      css={css`
        position: fixed;
        width: 100%;
        top: 0px;
      `}
    >
      <ContainerNavFoot>
        <p
          css={css`
            color: #555555;
            margin: auto;
            font-weight: bold;
            font-size: 24px;
          `}
        >
          PhoneBook
        </p>
      </ContainerNavFoot>
    </nav>
  );
};

export default Navbar;
