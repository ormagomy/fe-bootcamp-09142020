import React, { useState } from 'react';

import { Car } from '../models/Cars';
import { CarForm, CarFormData } from './CarForm';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';

export type CarToolProps = {
    cars: Car[];
};

export function CarTool(props: CarToolProps) {
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
        <>
            <ToolHeader headerText="Car tool" />
            <CarTable cars={cars} onDeleteCar={deleteCar} />
            <CarForm buttonText="Add Car" onSubmitCar={addCar} />
        </>
    );
}
