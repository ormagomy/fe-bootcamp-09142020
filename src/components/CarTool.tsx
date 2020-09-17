import React from 'react';
import { makeStyles } from '@material-ui/core';

import { Car } from '../models/Cars';
import { CarForm } from './CarForm';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';
import { useCarList } from '../hooks/useCarList';

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
    const [cars, carToEdit, addCar, setCarToEdit, saveCarEdit, cancelEdit, deleteCar] = useCarList(defaultCars);

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Car tool" />
            <CarTable cars={cars} carToEdit={carToEdit} colors={colors} onEditCar={setCarToEdit} onSaveEdit={saveCarEdit} onCancelEdit={cancelEdit} onDeleteCar={deleteCar} />
            <CarForm buttonText="Add Car" colors={colors} onAddCar={addCar} />
        </div>
    );
}
