import React, { ChangeEvent, useState } from 'react';

export type CarFormData = {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
};

export type CarFormProps = {
    buttonText?: string;
    onSubmitCar: (carFormData: CarFormData) => void;
};

export function CarForm(props: CarFormProps) {
    const emptyCarForm = {
        make: '',
        model: '',
        year: 2000,
        color: '',
        price: 0,
    };
    const [carForm, setCarForm] = useState(emptyCarForm);

    const updateCarForm = (e: ChangeEvent<HTMLInputElement>) => {
        setCarForm({
            ...carForm,
            [e.target.name]: e.target.value,
        });
    };

    const submitCar = () => {
        props.onSubmitCar({ ...carForm });
        setCarForm(emptyCarForm);
    };

    return (
        <form>
            <div>
                <label>
                    Make
                    <input type="text" value={carForm.make} onChange={updateCarForm} name="make" />
                </label>
            </div>
            <div>
                <label>
                    Model
                    <input type="text" value={carForm.model} onChange={updateCarForm} name="model" />
                </label>
            </div>
            <div>
                <label>
                    Year
                    <input type="number" value={carForm.year} onChange={updateCarForm} name="year" />
                </label>
            </div>
            <div>
                <label>
                    Color
                    <input type="text" value={carForm.color} onChange={updateCarForm} name="color" />
                </label>
            </div>
            <div>
                <label>
                    Price
                    <input type="number" value={carForm.price} onChange={updateCarForm} name="price" />
                </label>
            </div>
            <button type="button" onClick={submitCar}>
                {props.buttonText}
            </button>
        </form>
    );
}

CarForm.defaultProps = {
    buttonText: 'Submit Color',
};
