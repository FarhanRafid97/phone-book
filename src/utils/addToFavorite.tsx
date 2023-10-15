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
  cache.evict({ id: `contact:${contact.id}` });

  tempFavorite.push(contact);
  tempExludeId.push(contact.id);
  refetchLocalStorage(contact.id);
  localStorage.setItem('favorite', JSON.stringify(tempFavorite));
  localStorage.setItem('excludeID', JSON.stringify(tempExludeId));
};

export const refetchLocalStorage = makeVar(1);
export const isSkip = makeVar(true);
