import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { TextField, Button, makeStyles, IconButton, List, ListItem } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';
const MULTIPLY_ACTION = 'MULTIPLY';
const DIVIDE_ACTION = 'DIVIDE';
const CLEAR_ACTION = 'CLEAR';
const DELETE_HISTORY_ACTION = 'DELETE_HISTORY';

interface CalcOpAction extends Action {
    payload: { num: number };
}

interface DeleteHistoryAction extends Action {
    payload: { index: number };
}

type CalcOpActionCreator = (num: number) => CalcOpAction;
type SimpleActionCreator = () => Action;
type DeleteHistoryActionCreator = (index: number) => DeleteHistoryAction;

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

const createClearAction: SimpleActionCreator = () => ({
    type: CLEAR_ACTION,
});

const createDeleteAction: DeleteHistoryActionCreator = index => ({
    type: DELETE_HISTORY_ACTION,
    payload: { index },
});

type CalcToolHistory = {
    operation: string;
    value: number;
};

type CalcToolState = {
    result: number;
    history: CalcToolHistory[];
    validationError?: string;
};

const defaultState = {
    result: 0,
    history: [],
};

function isCalcOpAction(action: Action<string>): action is CalcOpAction {
    return action.type === ADD_ACTION || action.type === SUBTRACT_ACTION || action.type === MULTIPLY_ACTION || action.type === DIVIDE_ACTION;
}
function isDeleteHistoryAction(action: Action<string>): action is DeleteHistoryAction {
    return action.type === DELETE_HISTORY_ACTION;
}

const calcToolReducer: Reducer<CalcToolState, CalcOpAction | DeleteHistoryAction | Action> = (state = defaultState, action) => {
    if (isCalcOpAction(action)) {
        if (action.payload.num < 0 || action.payload.num > 10) {
            return {
                ...state,
                validationError: 'Input number must be between 0 and 10',
            };
        }

        const newState = {
            ...state,
            validationError: undefined,
            history: [...state.history, { operation: action.type, value: action.payload.num }],
        };

        switch (action.type) {
            case ADD_ACTION:
                newState.result = state.result + action.payload.num;
                return newState;
            case SUBTRACT_ACTION:
                newState.result = state.result - action.payload.num;
                return newState;
            case MULTIPLY_ACTION:
                newState.result = state.result * action.payload.num;
                return newState;
            case DIVIDE_ACTION:
                newState.result = state.result / action.payload.num;
                return newState;
        }
    }

    if (isDeleteHistoryAction(action)) {
        const updatedHistory = [...state.history];
        updatedHistory.splice(action.payload.index, 1);
        return {
            ...state,
            history: updatedHistory,
        };
    }

    switch (action.type) {
        case CLEAR_ACTION:
            return {
                ...defaultState,
            };
        default:
            return state;
    }
};

const calcToolStore = createStore(calcToolReducer);

const mapOpActionToString = (actionType: string) => {
    switch (actionType) {
        case ADD_ACTION:
            return '+';
        case SUBTRACT_ACTION:
            return '-';
        case MULTIPLY_ACTION:
            return '*';
        case DIVIDE_ACTION:
            return '/';
    }
};

const useStyles = makeStyles({
    resultContainer: {
        width: 240,
        fontSize: 40,
        textAlign: 'right',
        margin: '0 0 10px 4px',
    },
    inputContainer: {
        margin: '16px 4px',
    },
    actionButton: {
        minWidth: 40,
        margin: '0 4px',
    },
});

type CalcToolProps = {
    result: number;
    history: CalcToolHistory[];
    validationError?: string;
    onAdd: (num: number) => void;
    onSubtract: (num: number) => void;
    onMultiply: (num: number) => void;
    onDivide: (num: number) => void;
    onClear: () => void;
    onDeleteHistory: (num: number) => void;
};

function CalcTool({ result, history, validationError, onAdd, onSubtract, onMultiply, onDivide, onClear, onDeleteHistory }: CalcToolProps) {
    const [numInput, setNumInput] = useState(0);
    const classes = useStyles();

    const clear = () => {
        setNumInput(0);
        onClear();
    };

    return (
        <>
            <div className={classes.resultContainer}>{result}</div>
            <div className={classes.inputContainer}>
                <TextField type="number" label="Num Input" value={numInput} onChange={e => setNumInput(Number(e.target.value))} />
            </div>
            {validationError && <div>{validationError}</div>}
            <div>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={() => onAdd(numInput)}>
                    +
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={() => onSubtract(numInput)}>
                    -
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={() => onMultiply(numInput)}>
                    *
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={() => onDivide(numInput)}>
                    /
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" onClick={clear}>
                    Clear
                </Button>
            </div>
            <List dense>
                {history.map((item, index) => (
                    <ListItem key={index} divider={index !== history.length - 1}>
                        {mapOpActionToString(item.operation)} {item.value}
                        &nbsp;&nbsp;&nbsp;
                        <IconButton size="small" onClick={() => onDeleteHistory(index)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

function CalcToolContainer() {
    const stateMap = {
        result: useSelector<CalcToolState, number>(state => state.result),
        history: useSelector<CalcToolState, CalcToolHistory[]>(state => state.history),
        validationError: useSelector<CalcToolState, string | undefined>(state => state.validationError),
    };

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
            onDeleteHistory: createDeleteAction,
        },
        useDispatch()
    );

    return <CalcTool {...stateMap} {...boundActionsMap} />;
}

ReactDOM.render(
    <Provider store={calcToolStore}>
        <CalcToolContainer />
    </Provider>,
    document.querySelector('#root')
);
