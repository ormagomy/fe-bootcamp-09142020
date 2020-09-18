import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';

export interface CalcOpAction extends Action {
    payload: { num: number };
}

export type CalcOpActionCreator = (num: number) => CalcOpAction;

export const createAddAction: CalcOpActionCreator = num => ({
    type: ADD_ACTION,
    payload: { num },
});

export const createSubtractAction: CalcOpActionCreator = num => ({
    type: SUBTRACT_ACTION,
    payload: { num },
});

export type CalcToolState = {
    result: number;
};

export const calcToolReducer: Reducer<CalcToolState, CalcOpAction> = (state = { result: 0 }, action) => {
    switch (action.type) {
        case ADD_ACTION:
            return {
                ...state,
                result: state.result + action.payload.num,
            };
        case SUBTRACT_ACTION:
            return {
                ...state,
                result: state.result - action.payload.num,
            };
        default:
            return state;
    }
};

export const calcToolStore = createStore(calcToolReducer);

type CalcToolProps = {
    result: number;
    onAdd: (num: number) => void;
    onSubtract: (num: number) => void;
};

export function CalcTool({ result, onAdd, onSubtract }: CalcToolProps) {
    const [numInput, setNumInput] = useState(0);

    return (
        <>
            <div>
                Result: <span>{result}</span>
            </div>
            <div>
                <label>
                    Num Input: <input type="number" value={numInput} onChange={e => setNumInput(e.target.valueAsNumber)} />
                </label>
            </div>
            <fieldset>
                <button type="button" onClick={() => onAdd(numInput)}>
                    +
                </button>
                <button type="button" onClick={() => onSubtract(numInput)}>
                    -
                </button>
            </fieldset>
        </>
    );
}

export function CalcToolContainer() {
    const result = useSelector<CalcToolState, number>(state => state.result);
    const boundActionsMap = bindActionCreators(
        {
            onAdd: createAddAction,
            onSubtract: createSubtractAction,
        },
        useDispatch()
    );

    return <CalcTool result={result} {...boundActionsMap} />;
}

ReactDOM.render(
    <Provider store={calcToolStore}>
        <CalcToolContainer />
    </Provider>,
    document.querySelector('#root')
);
