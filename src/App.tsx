import { css } from '@emotion/react';
import { Order_By, useGetContactListQuery } from '../src/gql/file';

import Container from '@/components/Ui/Container';
import Layouts from '@/components/modules/layouts/Layouts';
import { useReactiveVar } from '@apollo/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Spinner from './components/Ui/Spinner';
import ListContact from './components/modules/PhoneBook/ListContact';
import { isMoreList } from './utils/provider';

const App = function App() {
  const isMoreData = useReactiveVar(isMoreList);

  const [offset, setOffset] = useState(0);
  const { data, fetchMore, loading } = useGetContactListQuery({
    variables: { limit: 6, offset: offset, order_by: [{ id: Order_By.Desc }] },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layouts>
      <Container>
        {loading ? (
          <div
            css={css`
              height: 400px;
              display: flex;
              width: 100%;
              justify-content: center;
              align-items: center;
            `}
          >
            <Spinner size={40} color="white" />
          </div>
        ) : (
          <>
            <ul
              css={css`
                display: flex;
                flex-direction: column;
                row-gap: 15px;
                justify-content: center;
                align-items: center;
              `}
            >
              {data?.contact.map((contact) => {
                return <ListContact key={contact.id} contact={contact} />;
              })}
            </ul>
            <div css={paginationStyle}>
              {offset > 0 && (
                <button
                  disabled={loading}
                  onClick={async () => {
                    await fetchMore({
                      variables: { offset: offset - 5 },
                    });
                    setOffset((p) => p - 5);
                  }}
                >
                  <ChevronLeft size={24} color="white" />
                </button>
              )}

              {isMoreData && (
                <button
                  disabled={loading}
                  onClick={async () => {
                    await fetchMore({
                      variables: { offset: offset + 5 },
                    });
                    setOffset((p) => p + 5);
                  }}
                >
                  <ChevronRight size={24} color="white" />
                </button>
              )}
            </div>
          </>
        )}
      </Container>
    </Layouts>
  );
};

const paginationStyle = css`
  display: flex;
  margin-top: 30px;
  gap: 15px;
  justify-content: center;
  align-items: center;

  button {
    border: none;

    padding: 8px 10px;
    border-radius: 7px;
    background-color: rgb(255, 255, 255, 0.15);
    cursor: pointer;
    &:hover {
      background-color: rgb(255, 255, 255, 0.35);
    }
  }
`;

export default App;
