import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StockWatchRouter from './components/StockWatchRouter/StockWatchRouter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StockWatchRouter />, document.getElementById('root'));
registerServiceWorker();
