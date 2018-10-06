import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App/App.js';
import {HashRouter, Route, Switch} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" name="App" component={App}/>
    </Switch>
  </HashRouter>,
  document.getElementById('root'));

registerServiceWorker();
