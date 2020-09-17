import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';

export type ColorFormData = {
    name: string;
    hexcode: string;
};

export type ColorFormProps = {
    buttonText?: string;
    onSubmitColor: (colorFormData: ColorFormData) => void;
};

const useStyles = makeStyles({
    addButton: {},
});

export function ColorForm(props: ColorFormProps) {
    const classes = useStyles();
    const emptyColorForm = {
        name: '',
        hexcode: '',
    };
    const [colorForm, setColorForm] = useState(emptyColorForm);

    const updateColorForm = (e: ChangeEvent<HTMLInputElement>) => {
        setColorForm({
            ...colorForm,
            [e.target.name]: e.target.value,
        });
    };

    const submitColor = () => {
        props.onSubmitColor({ ...colorForm });
        setColorForm(emptyColorForm);
    };

    return (
        <Grid container spacing={2}>
            <Grid item>
                <TextField label="Color Name" onChange={updateColorForm} name="name" value={colorForm.name} />
            </Grid>
            <Grid item>
                <TextField label="Color Hexcode" onChange={updateColorForm} name="hexcode" value={colorForm.hexcode} />
            </Grid>
            <Grid item xs={12}>
                <Button className={classes.addButton} color="default" variant="contained" onClick={submitColor}>
                    {props.buttonText}
                </Button>
            </Grid>
        </Grid>
    );
}

ColorForm.defaultProps = {
    buttonText: 'Submit Color',
};
