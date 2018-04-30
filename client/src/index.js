import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App/App.js';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";
import {HashRouter, Route, Switch} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" name="App" component={App}/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
