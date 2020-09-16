import React from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core';

import { Car } from '../models/Cars';
import { CarViewRow } from './CarViewRow';

const useStyles = makeStyles({
    table: {
        width: 1000,
    },
});

export type CarTableProps = {
    cars: Car[];
    onDeleteCar: (id: number) => void;
};

const attrs = ['Id', 'Make', 'Model', 'Year', 'Color', 'Price', 'Actions'];

export function CarTable(props: CarTableProps) {
    const classes = useStyles();

    return (
        <Table className={classes.table} size="small">
            <TableHead>
                <TableRow>
                    {attrs.map((attr) => (
                        <TableCell key={attr}>{attr}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.cars.map((car) => (
                    <CarViewRow car={car} key={car.id} onDeleteCar={props.onDeleteCar} />
                ))}
            </TableBody>
        </Table>
    );
}
