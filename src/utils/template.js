export default (html, initialState, opts) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>kek</title>
        <style>${opts && opts.style}</style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
  `;
};
