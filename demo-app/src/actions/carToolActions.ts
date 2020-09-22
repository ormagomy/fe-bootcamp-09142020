import { Action, Dispatch } from 'redux';
import { Car } from '../models/Cars';

export const REFRESH_CARS_REQUEST_ACTION = 'REFRESH_CARS_REQUEST_ACTION';
export const REFRESH_CARS_DONE_ACTION = 'REFRESH_CARS_DONE_ACTION';

export type RefreshCarsRequestAction = Action<string>;
export interface RefreshCarsDoneAction extends Action<string> {
    payload: { cars: Car[] };
}

type CreateRefreshCarsRequestAction = () => RefreshCarsRequestAction;
type CreateRefreshCarsDoneAction = (cars: Car[]) => RefreshCarsDoneAction;
export const createRefreshCarsRequestAction: CreateRefreshCarsRequestAction = () => ({
    type: REFRESH_CARS_REQUEST_ACTION,
});
export const createRefreshCarsDoneAction: CreateRefreshCarsDoneAction = cars => ({
    type: REFRESH_CARS_DONE_ACTION,
    payload: { cars },
});

export function isRefreshCarsRequestAction(action: Action<string>): action is RefreshCarsRequestAction {
    return [REFRESH_CARS_REQUEST_ACTION].includes(action.type);
}
export function isRefreshCarsDoneAction(action: Action<string>): action is RefreshCarsDoneAction {
    return [REFRESH_CARS_DONE_ACTION].includes(action.type);
}

export const refreshCars = () => {
    // This is the function object which is dispatched
    return async (dispatch: Dispatch) => {
        dispatch(createRefreshCarsRequestAction());
        const res = await fetch('http://localhost:3060/cars');
        const cars = await res.json();
        dispatch(createRefreshCarsDoneAction(cars));
    };
};

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
    payload: { car: Car };
}
export interface DeleteAction extends Action {
    payload: { carId: number };
}
export interface SortAction extends Action {
    payload: { carKey: keyof Car };
}

type CarActionCreator = (car: Car) => CarAction;
type AddActionCreator = (car: Car) => AddAction;
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

export const saveEditThunk = (car: Car) => {
    return async (dispatch: Dispatch) => {
        await fetch(`http://localhost:3060/cars/${car.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        dispatch(createSaveEditAction(car));
    };
};

export const createCancelEditAction: CancelEditActionCreator = () => ({
    type: CANCEL_EDIT_ACTION,
});

export const createAddAction: AddActionCreator = car => ({
    type: ADD_CAR_ACTION,
    payload: { car },
});

export const addCarThunk = (carForm: Omit<Car, 'id'>) => {
    return async (dispatch: Dispatch) => {
        const res = await fetch('http://localhost:3060/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(carForm),
        });
        const car = await res.json();
        dispatch(createAddAction(car));
    };
};

export const createDeleteAction: DeleteActionCreator = carId => ({
    type: DELETE_CAR_ACTION,
    payload: { carId },
});

export const deleteCarThunk = (carId: number) => {
    return async (dispatch: Dispatch) => {
        await fetch(`http://localhost:3060/cars/${carId}`, {
            method: 'DELETE',
        });
        dispatch(createDeleteAction(carId));
    };
};

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
