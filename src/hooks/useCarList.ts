import { useState } from 'react';
import { CarFormData } from '../components/CarForm';
import { Car } from '../models/Cars';

type UseCarList = (initialCarList: Car[]) => [Car[], Car | undefined, (carForm: CarFormData) => void, (car: Car) => void, (carToSave: Car) => void, () => void, (carId: number) => void];

export const useCarList: UseCarList = (initialCarList) => {
    const [cars, setCars] = useState([...initialCarList]);
    const [carToEdit, setCarToEdit] = useState<Car>();

    const addCar = (carForm: CarFormData) => {
        setCars(
            cars.concat({
                id: Math.max(...cars.map((car) => car.id), 0) + 1,
                ...carForm,
            })
        );
        cancelEdit();
    };

    const saveCarEdit = (carToSave: Car) => {
        const index = cars.findIndex((car) => carToSave.id === car.id);
        const carsUpdate = cars.concat(); // Clone the cars array
        carsUpdate.splice(index, 1, carToSave);
        setCars(carsUpdate);
        cancelEdit();
    };

    const cancelEdit = () => setCarToEdit(undefined);

    const deleteCar = (carId: number) => {
        setCars(cars.filter((car) => car.id !== carId));
        cancelEdit();
    };

    return [cars, carToEdit, addCar, setCarToEdit, saveCarEdit, cancelEdit, deleteCar];
};
