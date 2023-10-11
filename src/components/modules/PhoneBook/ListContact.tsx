import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { Edit, Phone, UserCircle } from 'lucide-react';
import React, { useState } from 'react';

interface IListContactProps {
  contact: BaseContact;
}
const ListContact: React.FC<IListContactProps> = ({ contact }) => {
  const isMore = contact.phones.length > 1;
  const [isShowMore, setIsShowMore] = useState(false);
  return (
    <div css={styleListContactContainer}>
      <UserCircle size={34} color="white" />
      <div css={styleDetailUser}>
        <h1>{`${contact.first_name} ${contact.last_name} ${contact.id}`}</h1>
        {isShowMore}
        {!isShowMore ? (
          <p className="phoneNumber">
            <Phone size={10} /> {contact.phones[0].number}
          </p>
        ) : (
          contact.phones.map((phone) => (
            <p className="phoneNumber">
              <Phone size={10} /> {phone.number}
            </p>
          ))
        )}

        {isMore && (
          <p onClick={() => setIsShowMore((p) => !p)} className="showMore">
            {!isShowMore ? 'Show More' : 'Show Less'}
          </p>
        )}
      </div>
      <div
        css={css`
          margin-left: auto;
          padding: 8px 10px;
          border-radius: 7px;
          background-color: rgb(0, 0, 0, 0.15);
          cursor: pointer;
          &:hover {
            background-color: rgb(0, 0, 0, 0.3);
          }
        `}
      >
        <Edit size={18} color="white" />
      </div>
    </div>
  );
};

const styleListContactContainer = css`
  background: #1e293b;
  width: 100%;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 15px;

  border-radius: 7px;
`;

const styleDetailUser = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #f8fafc;
  h1 {
    font-weight: 600;
  }
  .phoneNumber {
    font-size: 14px;
  }
  .showMore {
    width: fit-content;
    font-size: 10px;
    color: #0505e8;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`;

export default ListContact;
