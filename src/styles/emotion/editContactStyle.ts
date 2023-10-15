import { css } from '@emotion/react';

export const ButtonEditContact = css`
  border: none;
  padding: 7px 0;

  border-radius: 7px;
  cursor: pointer;
  background-color: #0e1c36;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  &:hover {
    background-color: #8f8f8f;
  }
`;
export const ButtonCancel = css`
  border: none;
  padding: 7px 15px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #c02121;

  color: white;
  &:hover {
    background-color: rgb(143, 143, 143);
  }
`;
export const ButtonSave = css`
  border: none;
  padding: 7px 10px;
  border-radius: 7px;
  width: fit-content;
  cursor: pointer;
  background-color: #2fb366;
  color: white;
  &:hover {
    background-color: #31985c;
  }
`;
export const InputWrapperStyle = css`
  z-index: 99;
  width: 100%;

  flex-direction: column;
  gap: 40px;
  display: flex;
  .wrapper-is-edit-button {
    display: flex;
    gap: 7px;
  }

  .wrapper-edit-contact {
    flex-direction: column;
    gap: 10px;
    display: flex;
    .form-edit-phone {
      display: flex;
      flex-direction: column;
      width: 100%;
      p {
        color: white;
      }
    }
  }
  .wrapper-edit-phones {
    flex-direction: column;
    gap: 10px;
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
      width: 100%;
      p {
        color: white;
      }
    }
  }
`;

export const ContainerFormInput = css`
  display: flex;
  flex-direction: column;

  gap: 5px;
  margin-bottom: 5px;
`;
