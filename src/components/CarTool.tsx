import React, { ChangeEvent, useState } from 'react';

import { Car } from '../models/Cars';

export type CarToolProps = {
    cars: Car[];
};

export function CarTool(props: CarToolProps) {
    const [carForm, setcarForm] = useState({
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
    });

    const updateCarForm = (e: ChangeEvent<HTMLInputElement>) => {
        setcarForm({
            ...carForm,
            [e.target.name]: e.target.value,
        });
    };

    console.log(carForm);

    const attrs = ['Id', 'Make', 'Model', 'Year', 'Color', 'Price'];

    return (
        <>
            <header>
                <h1>Car tool</h1>
            </header>
            <table>
                <thead>
                    <tr>
                        {attrs.map((attr) => (
                            <th key={attr}>{attr}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.make}</td>
                            <td>{car.model}</td>
                            <td>{car.year}</td>
                            <td>{car.color}</td>
                            <td>
                                {Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(car.price)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                        <input type="text" value={carForm.year} onChange={updateCarForm} name="year" />
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
                        <input type="text" value={carForm.price} onChange={updateCarForm} name="price" />
                    </label>
                </div>
                <button type="button" onClick={() => {}}>
                    Add Car
                </button>
            </form>
        </>
    );
}
