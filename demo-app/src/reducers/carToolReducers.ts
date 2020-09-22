import { Reducer } from 'react';
import {
    AddAction,
    ADD_CAR_ACTION,
    CANCEL_EDIT_ACTION,
    CarAction,
    DeleteAction,
    DELETE_CAR_ACTION,
    EDIT_CAR_ACTION,
    isAddAction,
    isCarAction,
    isDeleteAction,
    isSortAction,
    SAVE_CAR_ACTION,
    SortAction,
    isRefreshCarsDoneAction,
    RefreshCarsRequestAction,
} from '../actions/carToolActions';
import { Car } from '../models/Cars';
import { OrderType } from '../models/CarTool';

export const carsReducer: Reducer<Car[], CarAction | AddAction | DeleteAction | RefreshCarsRequestAction> = (cars = [], action) => {
    if (isRefreshCarsDoneAction(action)) {
        return action.payload.cars;
    }

    if (isCarAction(action) && action.type === SAVE_CAR_ACTION) {
        const index = cars.findIndex(item => action.payload.car.id === item.id);
        const carsUpdate = cars.concat(); // Clone the items array
        carsUpdate.splice(index, 1, action.payload.car);
        return carsUpdate;
    }

    if (isAddAction(action)) {
        return [
            ...cars,
            {
                ...action.payload.car,
            },
        ];
    }

    if (isDeleteAction(action)) {
        return cars.filter(car => car.id !== action.payload.carId);
    }

    return cars;
};

export const carToEditReducer: Reducer<Car | null, CarAction> = (carToEdit = null, action) => {
    if (action.type === EDIT_CAR_ACTION) {
        return action.payload.car;
    }

    if (action.type === CANCEL_EDIT_ACTION || action.type === DELETE_CAR_ACTION || action.type === SAVE_CAR_ACTION || action.type === ADD_CAR_ACTION) {
        return null;
    }

    return carToEdit;
};

export const orderReducer: Reducer<OrderType, SortAction> = (order = { direction: 'asc', column: 'id' }, action) => {
    if (isSortAction(action)) {
        const isAsc = order.column === action.payload.carKey && order.direction === 'asc';
        return {
            direction: isAsc ? 'desc' : 'asc',
            column: action.payload.carKey,
        };
    }

    return order;
};
