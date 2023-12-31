import Container from '@/components/Ui/Container';
import InputUnderline from '@/components/Ui/InputUnderLine';
import {
  ContainerFormInput,
  InputWrapperStyle,
} from '@/styles/emotion/editContactStyle';
import { BaseContact } from '@/types/Contact';
import { css } from '@emotion/react';

interface DetailUserProps {
  contact: BaseContact;
}

const DetailUser: React.FC<DetailUserProps> = ({ contact }) => {
  return (
    <Container>
      <h1
        css={css`
          color: white;
          margin-bottom: 25px;
          font-weight: 800;
          color: white;
          font-size: 24px;
        `}
      >
        Detail Contact
      </h1>

      <div
        css={css`
          max-height: 50vh;
          overflow-y: auto;
          padding-bottom: 15px;
          p {
            color: white;
          }
        `}
      >
        <div css={InputWrapperStyle}>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              width: 100%;
            `}
          >
            <label css={ContainerFormInput}>
              <p>First Name</p>
              <InputUnderline
                value={contact.first_name}
                name="first_name"
                readOnly
              />
            </label>
            <label css={ContainerFormInput}>
              <p>Last Name</p>
              <InputUnderline
                value={contact.first_name}
                name="last_name"
                readOnly
              />
            </label>
          </div>

          <div className="wrapper-edit-phones">
            {contact.phones.map((phone, i) => {
              return (
                <div
                  key={i}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  `}
                >
                  <label css={ContainerFormInput}>
                    <p className="label-input">Phone #{i + 1}</p>

                    <InputUnderline value={phone.number} readOnly />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailUser;
