import { BaseContact } from '@/types/Contact';

import { refetchLocalStorage } from './addToFavorite';

export const editFromLocalStorage = ({ contact }: { contact: BaseContact }) => {
  const data = localStorage.getItem('favorite');

  let tempFavorite: BaseContact[] = [];
  if (data) {
    try {
      tempFavorite = JSON.parse(data);
      if (!Array.isArray(tempFavorite)) {
        tempFavorite = [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  const newData = tempFavorite.map((localContact) =>
    localContact.id === contact.id ? contact : localContact,
  );
  refetchLocalStorage(Math.random());
  localStorage.setItem('favorite', JSON.stringify(newData));
};
