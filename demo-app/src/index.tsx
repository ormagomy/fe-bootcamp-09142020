import React from 'react';
import ReactDOM from 'react-dom';

import { CarToolContainer } from './components/CarToolContainer';

import { combineReducers, createStore } from 'redux';
import { carsReducer, carToEditReducer, orderReducer } from './reducers/carToolReducers';
import { Provider } from 'react-redux';
import { colorsReducer } from './reducers/colorToolReducer';

const carToolStore = createStore(
    combineReducers({
        cars: carsReducer,
        carToEdit: carToEditReducer,
        order: orderReducer,
        colors: colorsReducer,
    })
);

ReactDOM.render(
    <Provider store={carToolStore}>
        <CarToolContainer />
    </Provider>,
    document.querySelector('#root')
);
