import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import MDWA from './components/MDWA';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MDWA />, document.getElementById('root'));
registerServiceWorker();
