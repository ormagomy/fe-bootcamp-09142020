import React from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { Car } from '../models/Cars';

type CarViewRowProps = {
    car: Car;
    onDeleteCar: (id: number) => void;
    onEditCar: (car: Car) => void;
};

export function CarViewRow({ car, onDeleteCar, onEditCar }: CarViewRowProps) {
    const deleteCar = () => onDeleteCar(car.id);
    const editCar = () => onEditCar(car);

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
                <IconButton onClick={editCar}>
                    <Edit />
                </IconButton>
                <IconButton onClick={deleteCar} color="secondary">
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
