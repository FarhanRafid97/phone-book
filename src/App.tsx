import Container from '@/components/Ui/Container';
import Layouts from '@/components/modules/layouts/Layouts';
import { makeVar, useReactiveVar } from '@apollo/client';
import { css } from '@emotion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import SearchInput from './components/Ui/SearchInput';
import Spinner from './components/Ui/Spinner';
import FavoriteContact, {
  IsSkip,
} from './components/modules/PhoneBook/FavoriteContact';
import ListContact from './components/modules/PhoneBook/ListContact';
import { Order_By, useGetContactListQuery } from './gql/file';
import { isMoreList } from './utils/provider';

export const OffsetVar = makeVar(0);

export const App = function App() {
  const isMoreData = useReactiveVar(isMoreList);
  const isSkipFetch = useReactiveVar(IsSkip);

  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [eq, setEq] = useState('');

  const excludeID = localStorage.getItem('excludeID');

  const { data, fetchMore, loading } = useGetContactListQuery({
    variables: {
      limit: 11,
      offset: offset,
      order_by: [{ id: Order_By.Desc }],
      where: {
        id: {
          _nin: JSON.parse(excludeID ?? '[]'),
        },
      },
    },
    skip: isSkipFetch,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const searchUser = async () => {
      await fetchMore({
        variables: {
          offset: 0,
          limit: 11,
          where: {
            first_name: {
              _like: `%${eq}%`,
            },
          },
        },
      });
      OffsetVar(0);
    };
    searchUser();
  }, [fetchMore, eq]);

  useEffect(() => {
    const debounceFn = () => {
      if (search === eq) {
        return;
      }
      if (search === '') {
        setEq('');
      }

      setEq(search);
    };

    const toDebounce = setTimeout(() => {
      debounceFn();
    }, 600);

    return () => {
      clearTimeout(toDebounce);
    };
  }, [eq, search]);
  return (
    <>
      <Layouts>
        <Container>
          <SearchInput
            setSearch={setSearch}
            id="searchInput"
            aria-label="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FavoriteContact />

          <h1
            css={css`
              margin-bottom: 15px;
              font-weight: 800;
              color: white;
              font-size: 24px;
            `}
          >
            List Contacts
          </h1>
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
            <div>
              <div
                css={css`
                  display: flex;

                  flex-direction: column;
                  row-gap: 15px;
                  justify-content: center;
                  align-items: center;
                `}
              >
                {data?.contact.length ?? 0 > 1 ? (
                  data?.contact.map((contact) => {
                    return <ListContact key={contact.id} contact={contact} />;
                  })
                ) : (
                  <h1
                    css={css`
                      margin-bottom: 15px;
                      margin-top: 15px;
                      font-weight: 400;
                      color: white;
                      text-align: center;
                      font-size: 18px;
                    `}
                  >
                    No Contact List
                  </h1>
                )}
              </div>
              <div css={PaginationStyle}>
                {offset > 0 && (
                  <button
                    type="button"
                    aria-label="button-prev-pagination"
                    name="button-prev-pagination"
                    disabled={loading}
                    onClick={async () => {
                      await fetchMore({
                        variables: { offset: offset - 10 },
                      });
                      setOffset((p) => {
                        OffsetVar(p - 10);
                        return p - 10;
                      });
                    }}
                  >
                    <ChevronLeft size={24} color="white" />
                  </button>
                )}

                {isMoreData && (
                  <button
                    type="button"
                    aria-label="button-next-pagination"
                    name="button-next-pagination"
                    disabled={loading}
                    onClick={async () => {
                      await fetchMore({
                        variables: { offset: offset + 10 },
                      });
                      setOffset((p) => {
                        OffsetVar(p + 10);
                        return p + 10;
                      });
                    }}
                  >
                    <ChevronRight size={24} color="white" />
                  </button>
                )}
              </div>
            </div>
          )}
        </Container>
      </Layouts>
    </>
  );
};

const PaginationStyle = css`
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
