import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';
const MULTIPLY_ACTION = 'MULTIPLY';
const DIVIDE_ACTION = 'DIVIDE';

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

export const createMultiplyAction: CalcOpActionCreator = num => ({
    type: MULTIPLY_ACTION,
    payload: { num },
});

export const createDivideAction: CalcOpActionCreator = num => ({
    type: DIVIDE_ACTION,
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
        case MULTIPLY_ACTION:
            return {
                ...state,
                result: state.result * action.payload.num,
            };
        case DIVIDE_ACTION:
            return {
                ...state,
                result: state.result / action.payload.num,
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
    onMultiply: (num: number) => void;
    onDivide: (num: number) => void;
};

export function CalcTool({ result, onAdd, onSubtract, onMultiply, onDivide }: CalcToolProps) {
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
                <button type="button" onClick={() => onMultiply(numInput)}>
                    *
                </button>
                <button type="button" onClick={() => onDivide(numInput)}>
                    /
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
            onMultiply: createMultiplyAction,
            onDivide: createDivideAction,
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
