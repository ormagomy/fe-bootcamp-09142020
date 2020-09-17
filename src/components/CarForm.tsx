import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Color } from '../models/Colors';

export type CarFormData = {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
};

export type CarFormProps = {
    buttonText?: string;
    colors: Color[];
    onAddCar: (carFormData: CarFormData) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            marginTop: 30,
        },
        formControl: {
            width: 166,
        },
    })
);

export function CarForm({ buttonText, colors, onAddCar }: CarFormProps) {
    const classes = useStyles();

    const emptyCarForm = {
        make: '',
        model: '',
        year: 2000,
        color: '',
        price: 0,
    };
    const [carForm, setCarForm] = useState(emptyCarForm);

    const updateCarForm = (e: ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>) => {
        setCarForm({
            ...carForm,
            [e.target.name as string]: e.target.value,
        });
    };

    const submitCar = () => {
        onAddCar({ ...carForm });
        setCarForm(emptyCarForm);
    };

    return (
        <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item>
                <TextField name="make" label="Make" value={carForm.make} onChange={updateCarForm} />
            </Grid>
            <Grid item>
                <TextField name="model" label="Model" value={carForm.model} onChange={updateCarForm} />
            </Grid>
            <Grid item>
                <TextField name="year" label="Year" value={carForm.year} onChange={updateCarForm} />
            </Grid>
            <Grid item>
                <FormControl className={classes.formControl}>
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select name="color" labelId="color-label" value={carForm.color} onChange={updateCarForm}>
                        {colors.map((color) => (
                            <MenuItem key={color.id} value={color.name}>
                                {color.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <TextField name="price" label="Price" value={carForm.price} onChange={updateCarForm} />
            </Grid>
            <Grid item xs={12}>
                <Button color="default" variant="contained" onClick={submitCar}>
                    {buttonText}
                </Button>
            </Grid>
        </Grid>
    );
}

CarForm.defaultProps = {
    buttonText: 'Submit Color',
};
