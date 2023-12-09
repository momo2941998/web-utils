import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi.json'
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import store from './app/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { Spin } from 'antd';
import './i18n'
import { constants } from './constants';
let persistor = persistStore(store)
TimeAgo.addDefaultLocale(vi)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.Suspense fallback={<Spin/>}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
            <BrowserRouter basename={`${constants.BASENAME}/`}>
              <App />
            </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.Suspense>
);

