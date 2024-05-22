import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import Loading from './components/Loading.tsx';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
