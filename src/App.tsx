import { css } from '@emotion/react';
import { Order_By, useGetContactListQuery } from '../src/gql/file';

import Layouts from '@/components/modules/layouts/Layouts';
import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import Form from './components/Form';
import ListContact from './components/modules/PhoneBook/ListContact';
import { isMoreList } from './utils/provider';
import Container from '@/components/Ui/Container';

const App = function App() {
  const isMoreData = useReactiveVar(isMoreList);

  const [offset, setOffset] = useState(0);
  const { data, fetchMore, loading } = useGetContactListQuery({
    variables: { limit: 6, offset: offset, order_by: [{ id: Order_By.Desc }] },
  });

  return (
    <Layouts>
      <Container>
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
        {isMoreData && (
          <button
            disabled={loading}
            onClick={() => {
              fetchMore({
                variables: { offset: offset + 5 },
              });
              setOffset((p) => p + 5);
            }}
          >
            {loading ? 'loading' : 'fetch more'}
          </button>
        )}
      </Container>
    </Layouts>
  );
};

export default App;
