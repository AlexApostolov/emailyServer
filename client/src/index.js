// Data layer control (Redux)
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// Temporary test code for mailer
import axios from 'axios';
window.axios = axios;
// End test code

// 1st arg is the reducer(s), 2nd arg is initial state used when doing SSR, 3rd arg is middleware such as redux-thunk
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
