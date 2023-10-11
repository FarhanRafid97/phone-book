import ContainerNavFoot from '@/components/Ui/ContainerNavFoot';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Library, Phone, Star } from 'lucide-react';
const Icons = [{ icon: Library }, { icon: Phone }, { icon: Star }];
const Footer = () => {
  return (
    <footer
      css={css`
        position: fixed;
        width: 100%;
        bottom: 0px;
        display: flex;
        align-items: center;

        backdrop-filter: blur(12px);
      `}
    >
      <ContainerNavFoot>
        {Icons.map((icon) => (
          <WrapperIcon>
            <icon.icon size={26} color="white" />
          </WrapperIcon>
        ))}
      </ContainerNavFoot>
    </footer>
  );
};

const WrapperIcon = styled.div`
  padding: 5px 7px;
  border-radius: 6px;
  &:hover {
    background: rgb(255, 255, 255, 0.1);
  }
`;
export default Footer;
