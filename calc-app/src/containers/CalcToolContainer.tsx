import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    ADD_ACTION,
    SUBTRACT_ACTION,
    MULTIPLY_ACTION,
    DIVIDE_ACTION,
    createAddAction,
    createSubtractAction,
    createMultiplyAction,
    createDivideAction,
    createClearAction,
    createDeleteAction,
    createValidationErrorAction,
} from '../actions/calcToolActions';
import { CalcTool } from '../components/CalcTool';
import { CalcToolState, CalcToolResults, CalcToolHistory } from '../models/calcTools';

export function CalcToolContainer() {
    const stateMap = {
        result: useSelector<CalcToolState, CalcToolResults>(state => {
            return state.history.reduce(
                (result: CalcToolResults, item: CalcToolHistory) => {
                    switch (item.operation) {
                        case ADD_ACTION:
                            result.total = result.total + item.value;
                            result.stats.add++;
                            break;
                        case SUBTRACT_ACTION:
                            result.total = result.total - item.value;
                            result.stats.subtract++;
                            break;
                        case MULTIPLY_ACTION:
                            result.total = result.total * item.value;
                            result.stats.multiply++;
                            break;
                        case DIVIDE_ACTION:
                            result.total = result.total / item.value;
                            result.stats.divide++;
                            break;
                    }
                    return result;
                },
                { total: 0, stats: { add: 0, subtract: 0, multiply: 0, divide: 0 } }
            );
        }),
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
