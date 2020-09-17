import { useState } from 'react';
import { Car, CarFormData } from '../models/Cars';

type UseCarList = (initialCarList: Car[]) => [Car[], (carForm: CarFormData) => void, (car: Car) => void, (carId: number) => void];

export const useCarList: UseCarList = (initialCarList) => {
    const [cars, setCars] = useState([...initialCarList]);

    const addCar = (carForm: CarFormData) => {
        setCars(
            cars.concat({
                id: Math.max(...cars.map((car) => car.id), 0) + 1,
                ...carForm,
            })
        );
    };

    const replaceCar = (carToSave: Car) => {
        const index = cars.findIndex((car) => carToSave.id === car.id);
        const carsUpdate = cars.concat(); // Clone the cars array
        carsUpdate.splice(index, 1, carToSave);
        setCars(carsUpdate);
    };

    const deleteCar = (carId: number) => {
        setCars(cars.filter((car) => car.id !== carId));
    };

    return [cars, addCar, replaceCar, deleteCar];
};
