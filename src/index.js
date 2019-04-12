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

ReactDOM.render(
  <Router>
    <ActionCableProvider url={'ws://localhost:3000/cable'}>
      <Provider store={store}>
          <Route path="/" component={App} />
      </Provider>
    </ActionCableProvider>
  </Router>, document.getElementById('root'));

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// serviceWorker.unregister()
