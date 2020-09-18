import { useState } from 'react';
import { Car, CarFormData } from '../models/Cars';
import { useList } from './useList';

export type OrderType = {
    direction: orderType;
    column: keyof Car;
};

type orderType = 'asc' | 'desc' | undefined;

function descendingComparator(a: Car, b: Car, orderBy: keyof Car) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: orderType, orderBy: keyof Car) {
    return order === 'desc' ? (a: Car, b: Car) => descendingComparator(a, b, orderBy) : (a: Car, b: Car) => -descendingComparator(a, b, orderBy);
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
    return stabilizedThis.map((el) => el.car);
}

export const useCarStore = (initialCars: Car[]) => {
    const [cars, addCar, replaceCar, deleteCar] = useList([...initialCars]);
    const [carToEdit, setCarToEdit] = useState<Car>();
    const [order, setOrder] = useState<OrderType>({ direction: 'asc', column: 'id' });

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

    const handleSort = (carKey: keyof Car) => {
        const isAsc = order.column === carKey && order.direction === 'asc';
        setOrder({ direction: isAsc ? 'desc' : 'asc', column: carKey });
    };

    return {
        cars: stableSort(cars, getComparator(order.direction, order.column)),
        carToEdit,
        setCarToEdit,
        onAddCar,
        onDeleteCar,
        saveCarEdit,
        cancelEdit,
        order,
        handleSort,
    };
};
