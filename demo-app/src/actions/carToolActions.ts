import { Action } from 'redux';
import { Car } from '../models/Cars';

export const EDIT_CAR_ACTION = 'EDIT_CAR_ACTION';
export const SAVE_CAR_ACTION = 'SAVE_CAR_ACTION';
export const CANCEL_EDIT_ACTION = 'CANCEL_EDIT_ACTION';
export const ADD_CAR_ACTION = 'ADD_CAR_ACTION';
export const DELETE_CAR_ACTION = 'DELETE_CAR_ACTION';
export const SORT_ACTION = 'SORT_ACTION';

export interface CancelEditAction extends Action {}
export interface CarAction extends Action {
    payload: { car: Car };
}
export interface AddAction extends Action {
    payload: { carForm: Omit<Car, 'id'> };
}
export interface DeleteAction extends Action {
    payload: { carId: number };
}
export interface SortAction extends Action {
    payload: { carKey: keyof Car };
}

type CarActionCreator = (car: Car) => CarAction;
type AddActionCreator = (car: Omit<Car, 'id'>) => AddAction;
type CancelEditActionCreator = () => CancelEditAction;
type DeleteActionCreator = (carId: number) => DeleteAction;
type SortActionCreator = (carKey: keyof Car) => SortAction;

export const createEditAction: CarActionCreator = car => ({
    type: EDIT_CAR_ACTION,
    payload: { car },
});

export const createSaveEditAction: CarActionCreator = car => ({
    type: SAVE_CAR_ACTION,
    payload: { car },
});

export const createCancelEditAction: CancelEditActionCreator = () => ({
    type: CANCEL_EDIT_ACTION,
});

export const createAddAction: AddActionCreator = carForm => ({
    type: ADD_CAR_ACTION,
    payload: { carForm },
});

export const createDeleteAction: DeleteActionCreator = carId => ({
    type: DELETE_CAR_ACTION,
    payload: { carId },
});

export const createSortAction: SortActionCreator = carKey => ({
    type: SORT_ACTION,
    payload: { carKey },
});

export function isCarAction(action: Action<string>): action is CarAction {
    return action.type === EDIT_CAR_ACTION || action.type === SAVE_CAR_ACTION;
}

export function isAddAction(action: Action<string>): action is AddAction {
    return action.type === ADD_CAR_ACTION;
}

export function isCancelEditAction(action: Action<string>): action is CancelEditAction {
    return action.type === CANCEL_EDIT_ACTION;
}

export function isDeleteAction(action: Action<string>): action is DeleteAction {
    return action.type === DELETE_CAR_ACTION;
}

export function isSortAction(action: Action<string>): action is SortAction {
    return action.type === SORT_ACTION;
}
