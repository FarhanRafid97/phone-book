export interface BaseContact {
  __typename?: 'contact';
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: Array<{ __typename?: 'phone'; number: string }>;
}
