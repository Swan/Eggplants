import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Homepage from './components/homepage';
import Download from './components/download';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Homepage} />
              <Route path="/s/:id" component={Download} />
              <Route path="/b/:id" component={Download} />
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.app'));
