import React from 'react';

import { Car } from '../models/Cars';

export type CarToolProps = {
    cars: Car[],
};

export function CarTool(props: CarToolProps) {

    const attrs = ['Id', 'Make', 'Model', 'Year', 'Color', 'Price'];

    return (
        <>
            <header>
                <h1>Car tool</h1>
            </header>
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
                        <tr key={car.id}>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
