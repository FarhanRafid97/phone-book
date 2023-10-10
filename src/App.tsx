import './App.css';
import { css } from '@emotion/react';

const App = function App() {
  return (
    <button
      css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        position: relative;
        &:hover {
          color: red;
        }
        &::after {
          content: '';
          position: absolute;
          width: 250px;
          height: 250px;
          background-color: black;
        }
      `}
    >
      Test
    </button>
  );
};

export default App;
