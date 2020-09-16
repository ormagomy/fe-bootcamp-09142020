import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';
import { ColorForm, ColorFormData } from './ColorForm';

export type ColorToolProps = {
    colors: Color[];
    onAddColor: (color: Color) => void;
};

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
        margin: 10,
        padding: '10px 30px',
    },
});

export function ColorTool({ colors, onAddColor }: ColorToolProps) {
    const classes = useStyles();

    const addColor = (colorForm: ColorFormData) => {
        onAddColor({
            id: Math.max(...colors.map((c) => c.id), 0) + 1,
            ...colorForm,
        });
    };

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Color tool" />
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>{color.name}</li>
                ))}
            </ul>
            <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
        </div>
    );
}
