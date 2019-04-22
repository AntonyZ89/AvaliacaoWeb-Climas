import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import * as serviceWorker from './serviceWorker';

/**
 * @author Antony Gabriel
 * @since 18/04/19
 */

ReactDOM.render(<Container />, document.getElementsByClassName('container-fluid')[0]);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
