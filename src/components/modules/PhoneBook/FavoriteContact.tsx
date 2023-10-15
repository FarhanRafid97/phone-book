import Spinner from '@/components/Ui/Spinner';
import { BaseContact } from '@/types/Contact';
import { refetchLocalStorage } from '@/utils/addToFavorite';
import { makeVar, useReactiveVar } from '@apollo/client';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import ListContact from './ListContact';

const FavoriteContact: React.FC = () => {
  const [favoriteContacts, setFavoriteContacts] = useState<BaseContact[]>([]);
  const [loading, setLoading] = useState(true);
  const triggerRefetchStorage = useReactiveVar(refetchLocalStorage);
  useEffect(() => {
    let ignore = false;
    const getFavoriteContact = () => {
      const data = localStorage.getItem('favorite');

      let tempFavorite = [];
      if (data) {
        try {
          tempFavorite = JSON.parse(data);

          if (!ignore) {
            setFavoriteContacts(tempFavorite);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
      IsSkip(false);
      setLoading(false);
    };
    getFavoriteContact();
    () => {
      ignore = true;
    };
  }, [triggerRefetchStorage]);
  return (
    <div
      css={css`
        margin-bottom: 15px;
      `}
    >
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
        {loading ? (
          <div
            css={css`
              height: 400px;
              display: flex;
              width: 100%;
              justify-content: center;
              align-items: center;
            `}
          >
            <Spinner size={40} color="white" />
          </div>
        ) : favoriteContacts?.length > 0 ? (
          favoriteContacts?.map((contact) => (
            <ListContact key={contact.id} isFavoriteList contact={contact} />
          ))
        ) : (
          <h1
            css={css`
              margin-bottom: 15px;
              margin-top: 15px;
              font-weight: 400;
              color: white;
              text-align: center;
              font-size: 18px;
            `}
          >
            No Favorite Data
          </h1>
        )}
      </div>
    </div>
  );
};

export const ScrollAbleComponent = css`
  display: flex;
  gap: 15px;
  flex-direction: column;

  position: relative;
`;
export default FavoriteContact;

export const IsSkip = makeVar(true);
