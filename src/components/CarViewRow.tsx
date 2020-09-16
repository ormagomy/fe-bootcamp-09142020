import React from 'react';
import { Button, TableRow, TableCell } from '@material-ui/core';

import { Car } from '../models/Cars';

export function CarViewRow({ car, onDeleteCar }: { car: Car; onDeleteCar: (id: number) => void }) {
    const deleteCar = () => onDeleteCar(car.id);

    return (
        <TableRow>
            <TableCell>{car.id}</TableCell>
            <TableCell>{car.make}</TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.year}</TableCell>
            <TableCell>{car.color}</TableCell>
            <TableCell>
                {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(car.price)}
            </TableCell>
            <TableCell>
                <Button onClick={deleteCar} color="primary" variant="contained">
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}
