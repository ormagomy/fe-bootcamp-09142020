import React, { ChangeEvent, useState } from 'react';

import { Color } from '../models/Colors';

export type ColorToolProps = {
    colors: Color[];
};

export function ColorTool(props: ColorToolProps) {
    const [colors, setColors] = useState([...props.colors]);

    const [colorForm, setColorForm] = useState({
        colorName: '',
        colorHexcode: '',
    });

    const updateColorForm = (e: ChangeEvent<HTMLInputElement>) => {
        setColorForm({
            ...colorForm,
            [e.target.name]: e.target.value,
        });
    };

    const addColor = () => {
        setColors(
            colors.concat({
                id: Math.max(...colors.map((c) => c.id), 0) + 1,
                name: colorForm.colorName,
                hexcode: colorForm.colorHexcode,
            })
        );

        setColorForm({ colorName: '', colorHexcode: '' });
    };

    return (
        <>
            <header>
                <h1>Color tool</h1>
            </header>
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>{color.name}</li>
                ))}
            </ul>
            <form>
                <div>
                    <label>
                        Color Name
                        <input type="text" value={colorForm.colorName} onChange={updateColorForm} name="colorName" />
                    </label>
                </div>
                <div>
                    <label>
                        Color Hexcode
                        <input type="text" value={colorForm.colorHexcode} onChange={updateColorForm} name="colorHexcode" />
                    </label>
                </div>
                <button type="button" onClick={addColor}>
                    Add Color
                </button>
            </form>
        </>
    );
}
