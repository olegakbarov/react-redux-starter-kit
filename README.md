# Redux Blog Example

Full-featured example of publishing platform built with
[React](http://facebook.github.io/react/),
[Redux](http://rackt.github.io/redux/),
[React Router](http://rackt.github.io/react-router/),
[Babel](https://babeljs.io/) and
[Webpack](http://webpack.github.io/).

Some features:
- Server-side rendering
- Token-based authorization with [JWT](https://www.npmjs.com/package/jsonwebtoken)
- Markdown editor of posts with [marked](https://www.npmjs.com/package/marked)
- Modular CSS with [React CSS Modules](https://github.com/gajus/react-css-modules)
- API mock with [JSON server](https://www.npmjs.com/package/json-server)

## Running
```bash
npm install
```

### Production
```bash
make # build assets and server
npm start # start the server
```

Open [http://localhost:3000/](http://localhost:3000/) in the browser.

### Development
```bash
make dev # start development server with hot reloading
```

It will automatically open your default browser with project loaded.

**Note**: You will notice some latency between the moment it open the browser and really load the page. It's okay.

## You can

### while unauthorized

- View list of published posts
- View single post
- Log in with hardcoded credentials
- Be redirected from protected routes

### while authorized

- view `/dashboard` with unpublished posts
- edit and unpublish any `post`
- edit your `firstname` and `lastname` in `/profile`

## How it works

All data stored in API implemented with `jsonServer`. There're pre-populated `users` and `posts` entities. This implementation is example-only and you can easily drop-in your own backend solution. We aim just to show the direction.
