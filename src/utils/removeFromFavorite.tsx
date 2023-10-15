import { BaseContact } from '@/types/Contact';
import { refetchLocalStorage } from './addToFavorite';
import { cache } from './provider';

export const removeFromFavorite = ({
  contact,
  isFirstPage,
}: {
  contact: BaseContact;
  isFirstPage: boolean;
}) => {
  const data = localStorage.getItem('favorite');

  const excludeID = localStorage.getItem('excludeID');
  let tempExludeId: number[] = [];
  let tempFavorite: BaseContact[] = [];
  if (data) {
    try {
      tempFavorite = JSON.parse(data)?.filter(
        (favorite: BaseContact) => favorite.id !== contact.id,
      );

      console.log('tempFavorite', tempFavorite);
      if (!Array.isArray(tempFavorite)) {
        tempFavorite = [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (excludeID) {
    try {
      tempExludeId = JSON.parse(excludeID)?.filter(
        (id: number) => id !== contact.id,
      );
      if (!Array.isArray(tempExludeId)) {
        tempExludeId = [];
      }
    } catch (error) {
      console.error(error);
    }
  }
  cache.modify({
    fields: {
      contact(existing): BaseContact[] {
        if (!isFirstPage) {
          return existing;
        }
        return [contact, ...existing];
      },
    },
  });

  refetchLocalStorage(Math.random());
  localStorage.setItem('favorite', JSON.stringify(tempFavorite));
  localStorage.setItem('excludeID', JSON.stringify(tempExludeId));
};
