import React from 'react';
import { Car } from '../models/Cars';

export function CarViewRow({ car, onDeleteCar }: { car: Car; onDeleteCar: (id: number) => void }) {
    const deleteCar = () => onDeleteCar(car.id);

    return (
        <tr>
            <td>{car.id}</td>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.color}</td>
            <td>
                {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(car.price)}
            </td>
            <td>
                <button onClick={deleteCar}>Delete</button>
            </td>
        </tr>
    );
}
