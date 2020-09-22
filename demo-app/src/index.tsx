import React from 'react';
import ReactDOM from 'react-dom';

import { CarToolContainer } from './components/CarToolContainer';

import { Provider } from 'react-redux';
import { carToolStore } from './stores/carToolStore';

ReactDOM.render(
    <Provider store={carToolStore}>
        <CarToolContainer />
    </Provider>,
    document.querySelector('#root')
);
