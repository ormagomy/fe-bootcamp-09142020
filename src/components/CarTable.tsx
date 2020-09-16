import React from 'react';
import { Car } from '../models/Cars';
import { CarViewRow } from './CarViewRow';

export type CarTableProps = {
    cars: Car[];
    onDeleteCar: (id: number) => void;
};

const attrs = ['Id', 'Make', 'Model', 'Year', 'Color', 'Price', 'Actions'];

export function CarTable(props: CarTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    {attrs.map((attr) => (
                        <th key={attr}>{attr}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.cars.map((car) => (
                    <CarViewRow car={car} key={car.id} onDeleteCar={props.onDeleteCar} />
                ))}
            </tbody>
        </table>
    );
}
