import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'


let store = createStore(reducer)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path="/" component={App} />
    </Provider>
  </Router>, document.getElementById('root'));

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// serviceWorker.unregister()
