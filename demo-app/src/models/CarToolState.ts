import { Car } from './Cars';
import { OrderType } from './CarTool';

export type CarToolState = {
    cars: Car[];
    carToEdit: Car;
    order: OrderType;
};
