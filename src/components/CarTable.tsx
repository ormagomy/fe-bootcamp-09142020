import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core';

import { Car } from '../models/Cars';
import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';
import { Color } from '../models/Colors';

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
};

type orderType = 'asc' | 'desc' | undefined;

const headCells = [
    { id: 'id' as keyof Car, label: 'Id' },
    { id: 'make' as keyof Car, label: 'Make' },
    { id: 'model' as keyof Car, label: 'Model' },
    { id: 'year' as keyof Car, label: 'Year' },
    { id: 'color' as keyof Car, label: 'Color' },
    { id: 'price' as keyof Car, label: 'Price' },
];


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

export function CarTable({ cars, carToEdit, colors, onDeleteCar, onEditCar, onSaveEdit, onCancelEdit }: CarTableProps) {
    const classes = useStyles();

    const [orderBy, setOrderBy] = useState(headCells[0].id as keyof Car);
    const [order, setOrder] = useState<orderType>('asc');

    const handleSort = (carKey: keyof Car) => {
        const isAsc = orderBy === carKey && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(carKey);
    };

    return (
        <Table className={classes.table} size="small">
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell key={headCell.id}>
                            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleSort(headCell.id)}>
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {stableSort(cars, getComparator(order, orderBy)).map((car) =>
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
