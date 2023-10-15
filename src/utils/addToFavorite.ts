import { BaseContact } from '@/types/Contact';
import { cache } from './provider';
import { makeVar } from '@apollo/client';

export const addToFavorite = ({ contact }: { contact: BaseContact }) => {
  const data = localStorage.getItem('favorite');

  const excludeID = localStorage.getItem('excludeID');
  let tempExludeId = [];
  let tempFavorite = [];
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

  if (excludeID) {
    try {
      tempExludeId = JSON.parse(excludeID);

      if (!Array.isArray(tempExludeId)) {
        tempExludeId = [];
      }
    } catch (error) {
      console.error(error);
    }
  }
  const normalizedId = cache.identify({
    __ref: 'contact:' + contact.id,
  });

  cache.modify({
    id: normalizedId,
    fields: (_, { DELETE }) => DELETE,
  });

  tempFavorite.push(contact);
  tempExludeId.push(contact.id);
  localStorage.setItem('favorite', JSON.stringify(tempFavorite));
  localStorage.setItem('excludeID', JSON.stringify(tempExludeId));
  refetchLocalStorage(contact.id);
};

export const refetchLocalStorage = makeVar(1);
