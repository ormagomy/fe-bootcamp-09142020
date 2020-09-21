import { Action } from 'redux';
import { Color } from '../models/Colors';

export const ADD_COLOR_ACTION = 'ADD_COLOR_ACTION';

export interface AddColorAction extends Action {
    payload: { colorForm: Omit<Color, 'id'> };
}

type AddColorActionCreator = (colorForm: Omit<Color, 'id'>) => AddColorAction;

export const createAddColorAction: AddColorActionCreator = colorForm => ({
    type: ADD_COLOR_ACTION,
    payload: { colorForm },
});
