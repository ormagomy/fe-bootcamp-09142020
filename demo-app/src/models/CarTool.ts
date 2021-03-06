import { Car, CarFormData } from './Cars';

export type OrderType = {
    direction: 'asc' | 'desc' | undefined;
    column: keyof Car;
};

export type CarToolState = {
    cars: Car[];
    carToEdit?: Car;
    order: OrderType;
};

export type CarToolActions = {
    setCarToEdit: (car: Car) => void;
    onAddCar: (carForm: CarFormData) => void;
    onDeleteCar: (carId: number) => void;
    saveCarEdit: (carToSave: Car) => void;
    cancelEdit: () => void;
    handleSort: (carKey: keyof Car) => void;
};

export type CarToolStore = CarToolState & CarToolActions;
