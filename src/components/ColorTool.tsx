import React, { ChangeEvent, useState } from 'react';
import { ToolHeader } from "./ToolHeader";
import { Color } from '../models/Colors';

export type ColorToolProps = {
    colors: Color[];
};

export function ColorTool(props: ColorToolProps) {
    const [colors, setColors] = useState([...props.colors]);

    const [colorForm, setColorForm] = useState({
        name: '',
        hexcode: '',
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
                ...colorForm,
            })
        );

        setColorForm({ name: '', hexcode: '' });
    };

    return (
        <>
            <ToolHeader headerText="Color tool" />
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>{color.name}</li>
                ))}
            </ul>
            <form>
                <div>
                    <label>
                        Color Name
                        <input type="text" value={colorForm.name} onChange={updateColorForm} name="name" />
                    </label>
                </div>
                <div>
                    <label>
                        Color Hexcode
                        <input type="text" value={colorForm.hexcode} onChange={updateColorForm} name="hexcode" />
                    </label>
                </div>
                <button type="button" onClick={addColor}>
                    Add Color
                </button>
            </form>
        </>
    );
}
