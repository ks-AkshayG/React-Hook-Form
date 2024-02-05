import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </MantineProvider>
)
