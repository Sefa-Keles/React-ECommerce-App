import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css'
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//Contexts
import {AuthProvider} from './context/AuthContext'
import { BasketProvider } from './context/BasketContext';

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient({
  //Preventing the refetch process when we switch to another screen or tab
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </AuthProvider>
      </Router>  
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
