import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';
const MULTIPLY_ACTION = 'MULTIPLY';
const DIVIDE_ACTION = 'DIVIDE';
const CLEAR_ACTION = 'CLEAR';

interface CalcOpAction extends Action {
    payload: { num: number };
}

type CalcOpActionCreator = (num: number) => CalcOpAction;

const createAddAction: CalcOpActionCreator = num => ({
    type: ADD_ACTION,
    payload: { num },
});

const createSubtractAction: CalcOpActionCreator = num => ({
    type: SUBTRACT_ACTION,
    payload: { num },
});

const createMultiplyAction: CalcOpActionCreator = num => ({
    type: MULTIPLY_ACTION,
    payload: { num },
});

const createDivideAction: CalcOpActionCreator = num => ({
    type: DIVIDE_ACTION,
    payload: { num },
});

type ClearActionCreator = () => Action;

const createClearAction: ClearActionCreator = () => ({
    type: CLEAR_ACTION,
});

type CalcToolHistory = {
    operation: string;
    value: number;
};

type CalcToolState = {
    result: number;
    history: CalcToolHistory[];
};

const defaultState = {
    result: 0,
    history: [],
};

function isCalcOpAction(action: Action<string>): action is CalcOpAction {
    return action.type === ADD_ACTION || action.type === SUBTRACT_ACTION || action.type === MULTIPLY_ACTION || action.type === DIVIDE_ACTION;
}

const calcToolReducer: Reducer<CalcToolState, CalcOpAction | Action> = (state = defaultState, action) => {
    if (isCalcOpAction(action)) {
        switch (action.type) {
            case ADD_ACTION:
                return {
                    ...state,
                    result: state.result + action.payload.num,
                    history: [...state.history, { operation: '+', value: action.payload.num }],
                };
            case SUBTRACT_ACTION:
                return {
                    ...state,
                    result: state.result - action.payload.num,
                    history: [...state.history, { operation: '-', value: action.payload.num }],
                };
            case MULTIPLY_ACTION:
                return {
                    ...state,
                    result: state.result * action.payload.num,
                    history: [...state.history, { operation: '*', value: action.payload.num }],
                };
            case DIVIDE_ACTION:
                return {
                    ...state,
                    result: state.result / action.payload.num,
                    history: [...state.history, { operation: '/', value: action.payload.num }],
                };
        }
    } else if (action.type === CLEAR_ACTION) {
        return {
            ...defaultState,
        };
    }
    // fallthrough case
    return state;
};

const calcToolStore = createStore(calcToolReducer);

type CalcToolProps = {
    result: number;
    history: CalcToolHistory[];
    onAdd: (num: number) => void;
    onSubtract: (num: number) => void;
    onMultiply: (num: number) => void;
    onDivide: (num: number) => void;
    onClear: () => void;
};

function CalcTool({ result, history, onAdd, onSubtract, onMultiply, onDivide, onClear }: CalcToolProps) {
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
            <ul>
                {history.map(item => (
                    <li>
                        {item.operation} {item.value}
                    </li>
                ))}
            </ul>
            <button onClick={onClear}>Clear</button>
        </>
    );
}

function CalcToolContainer() {
    const result = useSelector<CalcToolState, number>(state => state.result);
    const history = useSelector<CalcToolState, CalcToolHistory[]>(state => state.history);

    /* This is creating dispatch bindings like this:
     *   onAdd: (num) => dispatch(createAddAction(num))
     *   onSubtract: (num) => dispatch(createSubtractAction(num))
     */
    const boundActionsMap = bindActionCreators(
        {
            onAdd: createAddAction,
            onSubtract: createSubtractAction,
            onMultiply: createMultiplyAction,
            onDivide: createDivideAction,
            onClear: createClearAction,
        },
        useDispatch()
    );

    return <CalcTool result={result} history={history} {...boundActionsMap} />;
}

ReactDOM.render(
    <Provider store={calcToolStore}>
        <CalcToolContainer />
    </Provider>,
    document.querySelector('#root')
);
