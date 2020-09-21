import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { historyReducer, validationErrorReducer } from './reducers/calcToolReducers';
import { CalcToolContainer } from './containers/CalcToolContainer';

const calcToolStore = createStore(
    combineReducers({
        history: historyReducer,
        validationError: validationErrorReducer,
    })
);

ReactDOM.render(
    <Provider store={calcToolStore}>
        <CalcToolContainer />
    </Provider>,
    document.querySelector('#root')
);
