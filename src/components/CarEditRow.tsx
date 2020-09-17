import React, { ChangeEvent, useState } from 'react';
import { IconButton, TableRow, TableCell, TextField, Select, MenuItem } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';

import { Car } from '../models/Cars';
import { Color } from '../models/Colors';
import {nanToString, nanToZero} from '../utils';

type CarEditRowProps = {
    car: Car;
    colors: Color[];
    onCancel: () => void;
    onSave: (car: Car) => void;
};

export function CarEditRow({ car, colors, onCancel, onSave }: CarEditRowProps) {
    const [carForm, setCarForm] = useState(car);

    const cancel = () => onCancel();

    const updateCarForm = (e: ChangeEvent<HTMLInputElement>) => {
        setCarForm({
            ...carForm,
            [e.target.name as string]: e.target.type === 'number' ? e.target.valueAsNumber : e.target.value,
        });
    };

    const updateColorValue = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCarForm({
            ...carForm,
            color: event.target.value as string,
        });
    };

    const save = () => {
        onSave({ 
            ...carForm, 
            year: nanToZero(carForm.year),
            price: nanToZero(carForm.price),
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
                <TextField name="year" type="number" value={nanToString(carForm.year)} onChange={updateCarForm} />
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
                <TextField name="price" type="number" value={nanToString(carForm.price)} onChange={updateCarForm} />
            </TableCell>

            <TableCell>
                <IconButton onClick={save}>
                    <Save />
                </IconButton>
                <IconButton onClick={cancel}>
                    <Cancel />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
