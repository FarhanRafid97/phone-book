import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';
import { Phone, UserCircle } from 'lucide-react';
import React, { useState } from 'react';
import ActionOption from './ActionOption';
import ModalForDetailUser from './ModalForDetailUser';

interface IListContactProps {
  contact: BaseContact;
  isFavoriteList?: boolean;
}
const ListContact: React.FC<IListContactProps> = ({
  contact,
  isFavoriteList,
}) => {
  const isMore = contact.phones.length > 1;
  const [isShowMore, setIsShowMore] = useState(false);
  const [isOpenModalDetailUser, setIsOpenModalDetailUser] = useState(false);
  return (
    <>
      <div
        css={styleListContactContainer}
        onClick={() => isOpenModalDetailUser}
      >
        <UserCircle size={34} color="white" />
        <div css={styleDetailUser}>
          <h1>{`${contact.first_name} ${contact.last_name} ${contact.id}`}</h1>
          {isShowMore}
          {!isShowMore ? (
            <p className="phoneNumber">
              <Phone size={10} /> {contact.phones?.[0]?.number ?? ''}
            </p>
          ) : (
            contact.phones.map((phone) => (
              <p key={phone.number} className="phoneNumber">
                <Phone size={10} /> {phone?.number}
              </p>
            ))
          )}

          {isMore && (
            <p onClick={() => setIsShowMore((p) => !p)} className="showMore">
              {!isShowMore ? 'Show More' : 'Show Less'}
            </p>
          )}
        </div>
        <div css={wrapperActionButton}>
          <ActionOption isFavoriteList={isFavoriteList} contact={contact} />
        </div>
      </div>
      {isOpenModalDetailUser ? (
        <ModalForDetailUser
          isOpenModal={isOpenModalDetailUser}
          setIsOpenModal={setIsOpenModalDetailUser}
          contact={contact}
        />
      ) : null}
    </>
  );
};

const wrapperActionButton = css`
  margin-left: auto;
`;

const styleListContactContainer = css`
  background: #262626;
  border: 1px solid #404040;
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
    color: #14b1ff;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`;

export default ListContact;
