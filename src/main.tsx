import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { client } from './utils/provider.ts';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { IThemes } from './types/Themes.ts';

const theme: IThemes = {
  colors: {
    primary: 'hotpink',
    secondary: '#ffff',
    basicText: '#CFCFCF',
  },
};
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
