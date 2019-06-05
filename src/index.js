import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import reducer from './reducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'

const store = createStore(reducer, applyMiddleware(thunk));

// <ActionCableProvider url={'ws://localhost:3000/cable'}>
// <ActionCableProvider url={"wss://cinematch-jbharwood.herokuapp.com/"}>



ReactDOM.render(
  <Router>
    <ActionCableProvider url={"ws://cinematch-jbharwood.herokuapp.com/"}>
      <Provider store={store}>
          <Route path="/" render={routerProps => <App {...routerProps} />} /> />
      </Provider>
    </ActionCableProvider>
  </Router>, document.getElementById('root'));
