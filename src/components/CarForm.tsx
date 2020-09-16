import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const cells = [
    { id: 'make', label: 'Make' },
    { id: 'model', label: 'Model' },
    { id: 'year', label: 'Year' },
    { id: 'color', label: 'Color' },
    { id: 'price', label: 'Price' },
];

export type CarFormData = {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
};

export type CarFormProps = {
    buttonText?: string;
    onSubmitCar: (carFormData: CarFormData) => void;
};

export function CarForm(props: CarFormProps) {
    const emptyCarForm = {
        make: '',
        model: '',
        year: 2000,
        color: '',
        price: 0,
    };
    const [carForm, setCarForm] = useState(emptyCarForm);

    const updateCarForm = (e: ChangeEvent<HTMLInputElement>) => {
        setCarForm({
            ...carForm,
            [e.target.name]: e.target.value,
        });
    };

    const submitCar = () => {
        props.onSubmitCar({ ...carForm });
        setCarForm(emptyCarForm);
    };

    return (
        <Grid container spacing={2}>
            {cells.map((cell) => (
                <Grid item xs={12}>
                    <TextField label={cell.label} onChange={updateCarForm} name={cell.id} value={carForm[cell.id as 'make' | 'model' | 'year' | 'color' | 'price']} />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={submitCar}>
                    {props.buttonText}
                </Button>
            </Grid>
        </Grid>
    );
}

CarForm.defaultProps = {
    buttonText: 'Submit Color',
};
