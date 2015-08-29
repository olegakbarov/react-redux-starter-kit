# redux-blog-example

Skeleton for publishing platform with React, Redux, React-Router, Eslint and Webpack.

- Server-side rendering
- Routes
- Token-based authorization
- Markdown editor of posts
- API mock with JSON server

### Up & running

`$ npm install` the dependencies

`$ npm start` this starts `jsonServer` as well as app itself

`$ gulp build` bundles up the project

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
