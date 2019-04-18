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
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import {connect} from 'react-redux'


// let primaryColor = "#323232"


// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: primaryColor,
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       light: '#0066ff',
//       main: '#0044ff',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#ffcc00',
//     },
//     // error: will use the default color
//   },
// });

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <ActionCableProvider url={'ws://localhost:3000/cable'}>
      <Provider store={store}>
          <Route path="/" render={routerProps => <App {...routerProps} />} /> />
      </Provider>
    </ActionCableProvider>
  </Router>, document.getElementById('root'));

// ReactDOM.render(
//   <Router>
//     <ActionCableProvider url={'ws://localhost:3000/cable'}>
//       <Provider store={store}>
//         <MuiThemeProvider theme={theme}>
//           <Route path="/" render={routerProps => <App primaryColor={primaryColor} {...routerProps} />} /> />
//         </MuiThemeProvider>,
//       </Provider>
//     </ActionCableProvider>
//   </Router>, document.getElementById('root'));

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// serviceWorker.unregister()
