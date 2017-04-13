import log from './utils/logger';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import configureStore from './store';
import template from './utils/template';
import { Provider } from 'react-redux';
import createRoutes from './routes';

export default () => {
  return (req, res, next) => {
    const ts = Date.now();

    const token = req.cookies && req.cookies.token;
    const store = configureStore({ auth: { token } });
    const initialState = JSON.stringify(store.getState());

    const routes = createRoutes(store);

    let html = null;
    try {
      html = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={{}}
            >
              {routes}
          </StaticRouter>
        </Provider>
      );
    } catch (err) {
      log.error(err);
      res.status(500).end('Internal server error');
      next(err);
    }

    const markup = template(html, initialState);
    res.send(markup);
    log.info(`Processed the request for: ${Date.now() - ts} ms`);
  };
};

// shaman up with CSS
// let css_to_inject = '';
// const hook = require('css-modules-require-hook');
// hook({
//   generateScopedName: '[name]__[local]___[hash:base64:5]',
//   processCss: function(styles) {
//     css_to_inject += styles.toString();
//
//     return JSON.stringify(css_to_inject);
//   }
// });
