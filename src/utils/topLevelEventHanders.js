
/* eslint-env browser, node */
import { addNotif, clearNotif } from 'actions';
import { store } from './App';

window.addEventListener('offline', () => {
  store.dispatch(addNotif({
    color: 'red',
    message: 'You appear to be offline. Check your network connection.',
    timeout: 10000000
  }));
});

window.addEventListener('online', () => {
  store.dispatch(clearNotif());
});
