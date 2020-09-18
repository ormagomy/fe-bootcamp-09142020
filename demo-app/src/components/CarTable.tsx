import React from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core';

import { Car } from '../models/Cars';
import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';
import { Color } from '../models/Colors';
import { OrderType } from '../hooks/useCarStore';

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

export type CarTableProps = {
    cars: Car[];
    carToEdit?: Car;
    colors: Color[];
    onDeleteCar: (id: number) => void;
    onEditCar: (car: Car) => void;
    onSaveEdit: (car: Car) => void;
    onCancelEdit: () => void;
    order: OrderType;
    onSort: (carKey: keyof Car) => void;
};

const headCells = [
    { id: 'id' as keyof Car, label: 'Id' },
    { id: 'make' as keyof Car, label: 'Make' },
    { id: 'model' as keyof Car, label: 'Model' },
    { id: 'year' as keyof Car, label: 'Year' },
    { id: 'color' as keyof Car, label: 'Color' },
    { id: 'price' as keyof Car, label: 'Price' },
];

export function CarTable({ cars, carToEdit, colors, onDeleteCar, onEditCar, onSaveEdit, onCancelEdit, order, onSort }: CarTableProps) {
    const classes = useStyles();

    return (
        <Table className={classes.table} size="small">
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell key={headCell.id}>
                            <TableSortLabel active={order.column === headCell.id} direction={order.column === headCell.id ? order.direction : 'asc'} onClick={() => onSort(headCell.id)}>
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cars.map((car) =>
                    carToEdit === car ? (
                        <CarEditRow car={car} key={car.id} colors={colors} onSave={onSaveEdit} onCancel={onCancelEdit} />
                    ) : (
                        <CarViewRow car={car} key={car.id} onEditCar={onEditCar} onDeleteCar={onDeleteCar} />
                    )
                )}
            </TableBody>
        </Table>
    );
}
