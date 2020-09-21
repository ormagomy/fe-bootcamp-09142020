import React from 'react';
import { makeStyles } from '@material-ui/core';

import { CarForm } from './CarForm';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';
import { Car } from '../models/Cars';
import { OrderType } from '../models/CarTool';

export type CarToolProps = {
    colors: Color[];
    cars: Car[];
    carToEdit?: Car;
    order: OrderType;
    onAddCar: (carForm: Omit<Car, 'id'>) => void;
    onDeleteCar: (id: number) => void;
    onEditCar: (car: Car) => void;
    onSaveEdit: (car: Car) => void;
    onCancelEdit: () => void;
    onSort: (carKey: keyof Car) => void;
};

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
        margin: 10,
        padding: '10px 30px',
    },
});

export function CarTool({ colors, cars, carToEdit, onEditCar, onAddCar, onDeleteCar, onSaveEdit, onCancelEdit, order, onSort }: CarToolProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Car tool" />
            <CarTable
                cars={cars}
                carToEdit={carToEdit}
                colors={colors}
                onEditCar={onEditCar}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onDeleteCar={onDeleteCar}
                order={order}
                onSort={onSort}
            />
            <CarForm buttonText="Add Car" colors={colors} onAddCar={onAddCar} />
        </div>
    );
}
