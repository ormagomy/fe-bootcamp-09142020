import React, { ChangeEvent, useState } from 'react';

import { Color } from '../models/Colors';

export type ColorToolProps = {
    colors: Color[];
};

export function ColorTool(props: ColorToolProps) {
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

    return (
        <>
            <header>
                <h1>Color tool</h1>
            </header>
            <ul>
                {props.colors.map((color) => (
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
                <button type="button" onClick={() => {}}>
                    Add Color
                </button>
            </form>
        </>
    );
}
