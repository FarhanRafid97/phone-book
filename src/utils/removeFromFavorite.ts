import { BaseContact } from '@/types/Contact';
import { refetchLocalStorage } from './addToFavorite';
import { cache } from './provider';
import { GetContactListDocument } from '@/gql/file';

export const removeFromFavorite = ({
  contact,
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

  const oldData = cache.readQuery({ query: GetContactListDocument }) as {
    contact: BaseContact[];
  };
  const newData = [...oldData.contact, contact];
  cache.writeQuery({ query: GetContactListDocument, data: newData });

  localStorage.setItem('favorite', JSON.stringify(tempFavorite));
  localStorage.setItem('excludeID', JSON.stringify(tempExludeId));
  refetchLocalStorage(Math.random());
};
