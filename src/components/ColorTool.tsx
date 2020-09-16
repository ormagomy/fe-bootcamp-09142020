import React, { useState } from 'react';
import { ToolHeader } from './ToolHeader';
import { Color } from '../models/Colors';
import { ColorForm, ColorFormData } from './ColorForm';

export type ColorToolProps = {
    colors: Color[];
};

export function ColorTool(props: ColorToolProps) {
    const [colors, setColors] = useState([...props.colors]);

    const addColor = (colorForm: ColorFormData) => {
        setColors(
            colors.concat({
                id: Math.max(...colors.map((c) => c.id), 0) + 1,
                ...colorForm,
            })
        );
    };

    return (
        <>
            <ToolHeader headerText="Color tool" />
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>{color.name}</li>
                ))}
            </ul>
            <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
        </>
    );
}
