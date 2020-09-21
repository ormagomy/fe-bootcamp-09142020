import { Action } from 'redux';

export const ADD_ACTION = 'ADD';
export const SUBTRACT_ACTION = 'SUBTRACT';
export const MULTIPLY_ACTION = 'MULTIPLY';
export const DIVIDE_ACTION = 'DIVIDE';
export const CLEAR_ACTION = 'CLEAR';
export const DELETE_HISTORY_ACTION = 'DELETE_HISTORY';
export const VALIDATION_ERROR_ACTION = 'VALIDATION_ERROR';

export type CalcActions = CalcOpAction | DeleteHistoryAction | ClearAction | ValidationErrorAction;

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

export const createClearAction: ClearActionCreator = () => ({
    type: CLEAR_ACTION,
});

export const createDeleteAction: DeleteHistoryActionCreator = index => ({
    type: DELETE_HISTORY_ACTION,
    payload: { index },
});

export const createValidationErrorAction: ValidationErrorActionCreator = message => ({
    type: VALIDATION_ERROR_ACTION,
    payload: { message },
});

export function isClearAction(action: Action<string>): action is ClearAction {
    return action.type === CLEAR_ACTION;
}
export function isCalcOpAction(action: Action<string>): action is CalcOpAction {
    return action.type === ADD_ACTION || action.type === SUBTRACT_ACTION || action.type === MULTIPLY_ACTION || action.type === DIVIDE_ACTION;
}
export function isDeleteHistoryAction(action: Action<string>): action is DeleteHistoryAction {
    return action.type === DELETE_HISTORY_ACTION;
}
export function isValidationErrorAction(action: Action<string>): action is ValidationErrorAction {
    return action.type === VALIDATION_ERROR_ACTION;
}
