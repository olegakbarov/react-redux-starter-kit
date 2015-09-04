# redux-blog-example

Full-featured example for publishing platform with [React](https://github.com/facebook/react), [Redux](https://github.com/rackt/redux), [react-router](https://github.com/rackt/react-router), [Eslint](https://github.com/eslint/eslint) and [Webpack](https://github.com/webpack/webpack).

- Server-side rendering
- Token-based authorization with [JWT](https://github.com/auth0/node-jsonwebtoken)
- Markdown editor of posts with [marked](https://github.com/chjj/marked)
- Modular CSS with [react-css-modules](https://github.com/gajus/react-css-modules)
- API mock with JSON server

### Up & running

`$ npm install` the dependencies

`$ npm run start` this starts app

`$ npm run dev` runs development server with hot reload

`$ webpack -p` bundles up the project

### How it works

All data stored in API implemented with `jsonServer`. There're pre-populated `users` and `posts` entities. This implementation is example-only and you can easily drop-in your own backend solution. We aim just to show the direction.

### You can

###### while unauthorized

- View list of published posts
- View single post
- Log in with hardcoded credentials
- Be redirected from protected routes

###### while authorized

- view `/dashboard` with unpublished posts
- edit and unpublish any `post`
- edit your `firstname` and `lastname` in `/profile`

### TODO

- [ ] comments
- [ ] pagination
- [ ] tests
