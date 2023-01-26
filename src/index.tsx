import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material'; 
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store/store";
import theme from "./config/themeMUI";

const container = document.getElementById("root");
const root = createRoot(container as Element); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
