import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'Main';
/*import configureStore from './store/configureStore';
import rootSaga from './sagas/rootSaga';

const store = configureStore();
store.runSaga(rootSaga);
store.subscribe(() => {
  console.log('App state', store.getState());
});
*/
import './styles/app.scss';

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
