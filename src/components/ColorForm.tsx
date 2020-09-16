import React, { ChangeEvent, useState } from 'react';

export type ColorFormData = {
    name: string;
    hexcode: string;
};

export type ColorFormProps = {
    buttonText?: string;
    onSubmitColor: (colorFormData: ColorFormData) => void;
};

export function ColorForm(props: ColorFormProps) {
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
            <button type="button" onClick={submitColor}>
                {props.buttonText}
            </button>
        </form>
    );
}

ColorForm.defaultProps = {
    buttonText: 'Submit Color',
};
