import { BaseContact } from '@/types/Contact';
import { refetchLocalStorage } from './addToFavorite';

export const removeFromLocalStorage = ({
  contact,
}: {
  contact: BaseContact;
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

  localStorage.setItem('favorite', JSON.stringify(tempFavorite));
  localStorage.setItem('excludeID', JSON.stringify(tempExludeId));
  refetchLocalStorage(Math.random());
};
