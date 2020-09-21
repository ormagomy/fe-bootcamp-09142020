import React, { ChangeEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators, combineReducers } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { TextField, Button, makeStyles, IconButton, List, ListItem } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';
const MULTIPLY_ACTION = 'MULTIPLY';
const DIVIDE_ACTION = 'DIVIDE';
const CLEAR_ACTION = 'CLEAR';
const DELETE_HISTORY_ACTION = 'DELETE_HISTORY';
const VALIDATION_ERROR_ACTION = 'VALIDATION_ERROR';

interface CalcOpAction extends Action {
    payload: { num: number };
}
interface ClearAction extends Action {}
interface DeleteHistoryAction extends Action {
    payload: { index: number };
}
interface ValidationErrorAction extends Action {
    payload: { message: string };
}

type CalcOpActionCreator = (num: number) => CalcOpAction;
type ClearActionCreator = () => ClearAction;
type DeleteHistoryActionCreator = (index: number) => DeleteHistoryAction;
type ValidationErrorActionCreator = (message: string) => ValidationErrorAction;

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

const createClearAction: ClearActionCreator = () => ({
    type: CLEAR_ACTION,
});

const createDeleteAction: DeleteHistoryActionCreator = index => ({
    type: DELETE_HISTORY_ACTION,
    payload: { index },
});

const createValidationErrorAction: ValidationErrorActionCreator = message => ({
    type: VALIDATION_ERROR_ACTION,
    payload: { message },
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

function isClearAction(action: Action<string>): action is ClearAction {
    return action.type === CLEAR_ACTION;
}
function isCalcOpAction(action: Action<string>): action is CalcOpAction {
    return action.type === ADD_ACTION || action.type === SUBTRACT_ACTION || action.type === MULTIPLY_ACTION || action.type === DIVIDE_ACTION;
}
function isDeleteHistoryAction(action: Action<string>): action is DeleteHistoryAction {
    return action.type === DELETE_HISTORY_ACTION;
}
function isValidationErrorAction(action: Action<string>): action is ValidationErrorAction {
    return action.type === VALIDATION_ERROR_ACTION;
}

type CalcActions = CalcOpAction | DeleteHistoryAction | ClearAction | ValidationErrorAction;

const resultReducer: Reducer<number, CalcActions> = (result = 0, action) => {
    if (isCalcOpAction(action)) {
        switch (action.type) {
            case ADD_ACTION:
                return result + action.payload.num;
            case SUBTRACT_ACTION:
                return result - action.payload.num;
            case MULTIPLY_ACTION:
                return result * action.payload.num;
            case DIVIDE_ACTION:
                return result / action.payload.num;
        }
    }

    if (isClearAction(action)) {
        return 0;
    }

    return result;
};

const historyReducer: Reducer<CalcToolHistory[], CalcActions> = (history = [], action) => {
    if (isCalcOpAction(action)) {
        return [...history, { operation: action.type, value: action.payload.num }];
    }

    if (isDeleteHistoryAction(action)) {
        const updatedHistory = [...history];
        updatedHistory.splice(action.payload.index, 1);
        return updatedHistory;
    }

    if (isClearAction(action)) {
        return [];
    }

    return history;
};

const validationErrorReducer: Reducer<string, CalcActions> = (validationError = '', action) => {
    if (isValidationErrorAction(action)) {
        return action.payload.message;
    }

    return validationError;
};

const calcToolStore = createStore(
    combineReducers({
        result: resultReducer,
        history: historyReducer,
        validationError: validationErrorReducer,
    })
);

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
    buttonContainer: {
        margin: '16px 0',
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
    onValidationError: (message: string) => void;
};

function CalcTool({ result, history, validationError, onAdd, onSubtract, onMultiply, onDivide, onClear, onDeleteHistory, onValidationError }: CalcToolProps) {
    const [numInput, setNumInput] = useState(0);
    const classes = useStyles();

    const clear = () => {
        setNumInput(0);
        onClear();
    };

    const doOperation = (op: (input: number) => void) => {
        return () => {
            if (numInput < 0 || numInput > 10) {
                onValidationError('Input must be between 0 and 10');
            } else {
                onValidationError('');
                op(numInput);
            }
        };
    };

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.valueAsNumber;
        if (newInput < 0 || newInput > 10) {
            onValidationError('Input must be between 0 and 10');
        } else {
            onValidationError('');
        }
        setNumInput(newInput);
    };

    return (
        <>
            <div className={classes.resultContainer}>{result}</div>
            <div className={classes.inputContainer}>
                <TextField type="number" label="Num Input" value={numInput} onChange={inputChange} />
            </div>
            {validationError && <div>{validationError}</div>}
            <div className={classes.buttonContainer}>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onAdd)}>
                    +
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onSubtract)}>
                    -
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onMultiply)}>
                    *
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onDivide)}>
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
            onValidationError: createValidationErrorAction,
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
