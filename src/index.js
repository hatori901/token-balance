import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { MoralisProvider } from "react-moralis";
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <MoralisProvider appId="tdwWkuiiWSeYIYznpPft9Qi8DJ8968S1qCFo436h" serverUrl="https://wjqhhlvdgol0.usemoralis.com:2053/server">
      <ColorModeScript />
      <App />
    </MoralisProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
