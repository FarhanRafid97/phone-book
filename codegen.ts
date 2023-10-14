import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://wpe-hiring.tokopedia.net/graphql',
  documents: './graphql/**/*.graphql',
  generates: {
    './src/gql/file.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
