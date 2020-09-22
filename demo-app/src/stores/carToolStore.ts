import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer, carToEditReducer, orderReducer } from '../reducers/carToolReducers';
import { colorsReducer } from '../reducers/colorToolReducer';

export const carToolStore = createStore(
    combineReducers({
        cars: carsReducer,
        carToEdit: carToEditReducer,
        order: orderReducer,
        colors: colorsReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
