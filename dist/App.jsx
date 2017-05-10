import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from 'Main';
import configureStore from './store';
import rootSaga from './sagas/rootSaga';
import './styles/app.scss';

const store = configureStore();
store.runSaga(rootSaga);
store.subscribe(() => {
  console.log('App state', store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
