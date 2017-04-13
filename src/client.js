import './css/index.css';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';
import createRoutes from './routes';

const rootEl = document.getElementById('root');

const App = ({ store }) => {
  if (!store) {
    let state = null;
    try {
      state = JSON.parse(window.__INITIAL_STATE__);
    } catch (err) {
      // TODO send to Sentry
    }
    store = configureStore(state);
  }

  const routes = createRoutes(store);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>
  );
};

render(
  <App />,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = <App />;
    render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
