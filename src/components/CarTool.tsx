import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';

import { Car } from '../models/Cars';
import { CarForm, CarFormData } from './CarForm';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';

export type CarToolProps = {
    cars: Car[];
};

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
        margin: 10,
        padding: '10px 30px',
    },
});

export function CarTool(props: CarToolProps) {
    const classes = useStyles();
    const [cars, setCars] = useState([...props.cars]);

    const addCar = (carForm: CarFormData) => {
        setCars(
            cars.concat({
                id: Math.max(...cars.map((car) => car.id), 0) + 1,
                ...carForm,
            })
        );
    };

    const deleteCar = (carId: number) => {
        setCars(cars.filter((car) => car.id !== carId));
    };

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Car tool" />
            <CarTable cars={cars} onDeleteCar={deleteCar} />
            <CarForm buttonText="Add Car" onSubmitCar={addCar} />
        </div>
    );
}
