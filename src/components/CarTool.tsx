import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { Car, CarFormData } from '../models/Cars';
import { CarForm } from './CarForm';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';
import { useList } from '../hooks/useList';

export type CarToolProps = {
    cars: Car[];
    colors: Color[];
};

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
        margin: 10,
        padding: '10px 30px',
    },
});

export function CarTool({ cars: defaultCars, colors }: CarToolProps) {
    const classes = useStyles();
    const [cars, addCar, replaceCar, deleteCar] = useList(defaultCars);
    const [carToEdit, setCarToEdit] = useState<Car>();

    const onAddCar = (carForm: CarFormData) => {
        addCar(carForm as Car);
        cancelEdit();
    };

    const onDeleteCar = (carId: number) => {
        deleteCar(carId);
        cancelEdit();
    };

    const saveCarEdit = (carToSave: Car) => {
        replaceCar(carToSave);
        cancelEdit();
    };

    const cancelEdit = () => setCarToEdit(undefined);

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Car tool" />
            <CarTable cars={cars} carToEdit={carToEdit} colors={colors} onEditCar={setCarToEdit} onSaveEdit={saveCarEdit} onCancelEdit={cancelEdit} onDeleteCar={onDeleteCar} />
            <CarForm buttonText="Add Car" colors={colors} onAddCar={onAddCar} />
        </div>
    );
}
