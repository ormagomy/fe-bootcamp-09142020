import React from 'react';
import { makeStyles } from '@material-ui/core';

import { useCarToolStoreContext } from '../contexts/carToolContext';
import { CarForm } from './CarForm';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';

export type CarToolProps = {
    colors: Color[];
};

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
        margin: 10,
        padding: '10px 30px',
    },
});

export function CarTool({ colors }: CarToolProps) {
    const classes = useStyles();
    const { cars, carToEdit, setCarToEdit, onAddCar, onDeleteCar, saveCarEdit, cancelEdit, order, handleSort } = useCarToolStoreContext();

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Car tool" />
            <CarTable cars={cars} carToEdit={carToEdit} colors={colors} onEditCar={setCarToEdit} onSaveEdit={saveCarEdit} onCancelEdit={cancelEdit} onDeleteCar={onDeleteCar} order={order} onSort={handleSort} />
            <CarForm buttonText="Add Car" colors={colors} onAddCar={onAddCar} />
        </div>
    );
}
