import { useState } from 'react';
import { Phone_Insert_Input, useAddContactWithPhonesMutation } from '../gql/file';
import { gql, useReactiveVar } from '@apollo/client';

const Form = () => {
  const [addContact] = useAddContactWithPhonesMutation();
  const [state, setState] = useState<{ first_name: string; last_name: string }>({
    first_name: '',
    last_name: '',
  });
  const [phonesStae, setPhoneStae] = useState<Phone_Insert_Input>({ number: '' });
  return (
    <div>
      <input
        type="text"
        value={state?.first_name}
        onChange={(e) => {
          setState((p) => ({ ...p, first_name: e.target.value }));
        }}
      />
      <input
        type="text"
        value={state.last_name}
        onChange={(e) => {
          setState((p) => ({ ...p, last_name: e.target.value }));
        }}
      />
      <input
        type="text"
        value={`${phonesStae.number}`}
        onChange={(e) => {
          setPhoneStae((p) => ({ ...p, number: e.target.value }));
        }}
      />
      <button
        onClick={async () => {
          await addContact({
            variables: { ...state, phones: phonesStae },
            update: (cache, { data }) =>
              cache.modify({
                fields: {
                  contact(existing) {
                    const newContactRef = cache.writeFragment({
                      data: data?.insert_contact?.returning[0],
                      fragment: gql`
                        fragment NewContact on Contact {
                          id
                          first_name
                          last_name
                          phones {
                            number
                          }
                        }
                      `,
                    });
                    return [newContactRef, ...existing];
                  },
                },
              }),
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
