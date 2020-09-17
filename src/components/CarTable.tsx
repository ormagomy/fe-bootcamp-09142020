import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core';

import { Car } from '../models/Cars';
import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';
import { Color } from '../models/Colors';

const useStyles = makeStyles({
    table: {
        width: 1000,
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
    { id: 'id', label: 'Id' },
    { id: 'make', label: 'Make' },
    { id: 'model', label: 'Model' },
    { id: 'year', label: 'Year' },
    { id: 'color', label: 'Color' },
    { id: 'price', label: 'Price' },
    { id: 'actions', label: 'Actions' },
];

function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: orderType, orderBy: string) {
    return order === 'desc' ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy);
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

    const [orderBy, setOrderBy] = useState(headCells[0].id);
    const [order, setOrder] = useState<orderType>('asc');

    const handleSort = (id: string) => {
        if (id === 'actions') {
            return;
        }
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    };

    return (
        <Table className={classes.table} size="small">
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) =>
                        headCell.id !== 'actions' ? (
                            <TableCell key={headCell.id}>
                                <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleSort(headCell.id)}>
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        ) : (
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        )
                    )}
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
