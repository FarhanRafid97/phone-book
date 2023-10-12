import ContainerNavFoot from '@/components/Ui/ContainerNavFoot';
import { css } from '@emotion/react';
import { Contact } from 'lucide-react';
const Navbar: React.FC = () => {
  return (
    <nav
      css={css`
        position: fixed;
        width: 100%;
        top: 0px;
        z-index: 999;
        backdrop-filter: blur(12px);
      `}
    >
      <ContainerNavFoot>
        <div
          css={css`
            font-weight: bold;
            align-items: end;
            gap: 10px;
            margin: 0 auto;
            font-size: 24px;
            display: flex;
            p {
              color: white;
            }
          `}
        >
          <Contact color="white" />
          <p>PhoneBook</p>
        </div>
      </ContainerNavFoot>
    </nav>
  );
};

export default Navbar;
