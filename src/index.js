import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import Graph from './Graph';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Graph />, document.getElementById('root'));

serviceWorker.unregister();
