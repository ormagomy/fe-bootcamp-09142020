import React from 'react';
import { makeStyles, List, ListItem } from '@material-ui/core';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';
import { ColorForm } from './ColorForm';

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

    return (
        <div className={classes.root}>
            <ToolHeader headerText="Color tool" />
            <List>
                {colors.map((color) => (
                    <ListItem key={color.id}>{color.name}</ListItem>
                ))}
            </List>
            <ColorForm buttonText="Add Color" onSubmitColor={(color) => onAddColor(color as Color)} />
        </div>
    );
}
