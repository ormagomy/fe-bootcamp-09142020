import React, { ChangeEvent, useState } from 'react';
import { IconButton, TableRow, TableCell, TextField, Select, MenuItem } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';

import { Car } from '../models/Cars';
import { Color } from '../models/Colors';

type CarEditRowProps = {
    car: Car;
    colors: Color[];
    onCancel: () => void;
};

export function CarEditRow({ car, onCancel, colors }: CarEditRowProps) {
    const cancel = () => onCancel();
    const [carForm, setCarForm] = useState(car);

    const updateCarForm = (e: ChangeEvent<HTMLInputElement>) => {
        setCarForm({
            ...carForm,
            [e.target.name]: e.target.value,
        });
    };

    const updateColorValue = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCarForm({
            ...carForm,
            color: event.target.value as string,
        });
    };

    return (
        <TableRow>
            <TableCell>{car.id}</TableCell>

            <TableCell>
                <TextField name="make" value={carForm.make} onChange={updateCarForm} />
            </TableCell>
            <TableCell>
                <TextField name="model" value={carForm.model} onChange={updateCarForm} />
            </TableCell>
            <TableCell>
                <TextField name="year" value={carForm.year} onChange={updateCarForm} />
            </TableCell>
            <TableCell>
                <Select name="color" value={carForm.color} onChange={updateColorValue}>
                    {colors.map((color) => (
                        <MenuItem key={color.id} value={color.name}>
                            {color.name}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell>
                <TextField name="price" value={carForm.price} onChange={updateCarForm} />
            </TableCell>

            <TableCell>
                <IconButton onClick={() => {}}>
                    <Save />
                </IconButton>
                <IconButton onClick={cancel}>
                    <Cancel />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
