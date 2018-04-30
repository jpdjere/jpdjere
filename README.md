# Express + React Starter Template Project

An Express + React starter boilerplate, based on Express Generator and Facebook Incubators' Create-React-App.

Express server runs on `port: 3001` and React Frontend on `port: 3000`.

The React Frontend, created using [`create-react-app`](https://github.com/facebook/create-react-app), is found inside the `client` directory.

## Added libraries

### Node/Express Backend

* [Axios HTTP Client](https://github.com/axios/axios)

### React Frontend

* [React-Redux](https://github.com/reactjs/redux): Predictable state container for JavaScript apps
* [Redux-Thunk](https://github.com/gaearon/redux-thunk): Thunk middleware for Redux
* [React-Router](https://github.com/ReactTraining/react-router): Declarative routing for React
* [Redux-Form](https://github.com/erikras/redux-form): A Higher Order Component using react-redux to keep form state in a Redux store

## Development Instructions

1. On the `root` level, install Node dependencies with `npm install`.
1. Start the Node/Express.js backend server with `npm start`.
1. On another Terminal tab, enter the `client` subdirectory and install the dependencies with `npm install`.
1. Start the Webpack dev-server with `npm start`.
1. In the client's `package.json` file, the `"proxy": "http://localhost:3001"` config proxies requests form the frontend to the Express backend.

## Deploy to production

1. On the `client` subdirectory, create a production build with `npm run build`.
1. Express was configured to point to the `build` directory on the `app.js` file.
1. Deploy your Node app and Express will automatically point to your React build.

## Author

* [**Juan Pablo Djeredjian:**](https://github.com/jpdjere)
