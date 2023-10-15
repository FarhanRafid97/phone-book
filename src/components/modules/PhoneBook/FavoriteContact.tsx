import Container from '@/components/Ui/Container';
import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import ListContact from './ListContact';

const FavoriteContact: React.FC = () => {
  const [favoriteContacts, setFavoriteContacts] = useState<BaseContact[]>([]);
  useEffect(() => {
    let ignore = false;
    const getFavoriteContact = () => {
      const data = localStorage.getItem('favorite');
      let tempFavorite = [];
      if (data) {
        try {
          tempFavorite = JSON.parse(data);
          if (!Array.isArray(tempFavorite)) {
            tempFavorite = [];
            return;
          }
          if (!ignore) {
            setFavoriteContacts(tempFavorite);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    };
    getFavoriteContact();
    () => {
      ignore = true;
    };
  }, []);
  return (
    <Container>
      <h1
        css={css`
          margin-bottom: 15px;
          font-weight: 800;
          color: white;
          font-size: 24px;
        `}
      >
        Favorite Contacts
      </h1>
      <div css={ScrollAbleComponent}>
        {favoriteContacts.length > 0 ? (
          favoriteContacts.map((contact) => <ListContact contact={contact} />)
        ) : (
          <h1>No Favorite Data</h1>
        )}
      </div>
    </Container>
  );
};

export const ScrollAbleComponent = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
`;
export default FavoriteContact;
