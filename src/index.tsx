import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Layout } from './components/layout/layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import vacationReducer from './store/reducers/vacation'

const store = createStore(vacationReducer);


//import { LandingPage } from './components/landing-page/landing-page';

ReactDOM.render(<Provider store={store}> <Layout /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
