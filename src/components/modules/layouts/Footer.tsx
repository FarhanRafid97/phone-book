import ContainerNavFoot from '@/components/Ui/ContainerNavFoot';
import { css } from '@emotion/react';
import { Library, Star, UserPlus } from 'lucide-react';
import { useState } from 'react';

import AddNewContact from '../PhoneBook/AddNewContact';
const Icons = [
  { icon: Library, name: 'Library' },
  { icon: UserPlus, name: 'UserPlus' },
  { icon: Star, name: 'Library' },
];
const Footer = () => {
  const [isOpenCreateContact, setIsOpenCreateContact] = useState(false);
  return (
    <>
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
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            `}
          >
            {Icons.map((icon, idx) => (
              <div
                onClick={() => {
                  if (icon.name !== 'UserPlus') {
                    return;
                  }
                  setIsOpenCreateContact(true);
                }}
                css={WrapperIcon}
                key={idx}
              >
                <icon.icon size={26} color="white" />
              </div>
            ))}
          </div>
        </ContainerNavFoot>
      </footer>
      {isOpenCreateContact ? (
        <AddNewContact
          isOpen={isOpenCreateContact}
          setIsOpen={setIsOpenCreateContact}
        />
      ) : null}
    </>
  );
};

const WrapperIcon = css`
  padding: 5px 7px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: rgb(255, 255, 255, 0.1);
  }
`;
export default Footer;
