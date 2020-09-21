import { Reducer } from 'react';
import { CalcActions, isCalcOpAction, isClearAction, isDeleteHistoryAction, isValidationErrorAction } from '../actions/calcToolActions';
import { CalcToolHistory } from '../models/calcTools';

export const historyReducer: Reducer<CalcToolHistory[], CalcActions> = (history = [], action) => {
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

export const validationErrorReducer: Reducer<string, CalcActions> = (validationError = '', action) => {
    if (isValidationErrorAction(action)) {
        return action.payload.message;
    }

    return validationError;
};
