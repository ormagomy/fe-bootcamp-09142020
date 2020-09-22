import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CarTool } from './CarTool';
import { ColorTool } from './ColorTool';
import { Color } from '../models/Colors';
import { CarToolState, OrderType } from '../models/CarTool';
import { Car } from '../models/Cars';
import { ColorToolState } from '../models/ColorToolState';
import { createAddColorAction } from '../actions/colorToolActions';
import { createAddAction, createCancelEditAction, createDeleteAction, createEditAction, createSaveEditAction, createSortAction, refreshCars } from '../actions/carToolActions';

function descendingComparator(a: Car, b: Car, orderBy: keyof Car) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: OrderType) {
    return order.direction === 'desc' ? (a: Car, b: Car) => descendingComparator(a, b, order.column) : (a: Car, b: Car) => -descendingComparator(a, b, order.column);
}

function stableSort(cars: Car[], comparator: (a: Car, b: Car) => number) {
    const stabilizedThis = cars.map((car, index) => {
        return { car, index };
    });
    stabilizedThis.sort((a, b) => {
        const order = comparator(a.car, b.car);
        if (order !== 0) return order;
        return a.index - b.index;
    });
    return stabilizedThis.map(el => el.car);
}

export function CarToolContainer() {
    const dispatch = useDispatch();

    const order = useSelector<CarToolState, OrderType>(state => state.order);
    const cars = useSelector<CarToolState, Car[]>(state => stableSort(state.cars, getComparator(order)));
    const carToEdit = useSelector<CarToolState, Car | undefined>(state => state.carToEdit);
    const colors = useSelector<ColorToolState, Color[]>(state => state.colors);

    const boundActions = bindActionCreators(
        {
            onAddColor: createAddColorAction,
            onAddCar: createAddAction,
            onDeleteCar: createDeleteAction,
            onEditCar: createEditAction,
            onSaveEdit: createSaveEditAction,
            onCancelEdit: createCancelEditAction,
            onSort: createSortAction,
        },
        dispatch
    );

    useEffect(() => {
        dispatch(refreshCars());
    }, [dispatch]);

    return (
        <>
            <ColorTool colors={colors} {...boundActions} />
            <CarTool colors={colors} cars={cars} carToEdit={carToEdit} order={order} {...boundActions} />
        </>
    );
}
