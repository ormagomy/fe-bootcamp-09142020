import React, { ChangeEvent, useState } from 'react';

import { Car } from '../models/Cars';

export type CarToolProps = {
    cars: Car[];
};

export function CarTool(props: CarToolProps) {
    const [cars, setCars] = useState([...props.cars]);

    const emptyCarForm = {
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
    };
    const [carForm, setcarForm] = useState(emptyCarForm);

    const updateCarForm = (e: ChangeEvent<HTMLInputElement>) => {
        setcarForm({
            ...carForm,
            [e.target.name]: e.target.value,
        });
    };

    const addCar = () => {
        setCars(
            cars.concat({
                id: Math.max(...cars.map((car) => car.id), 0) + 1,
                make: carForm.make,
                model: carForm.model,
                year: parseInt(carForm.year, 10),
                color: carForm.color,
                price: parseInt(carForm.price, 10),
            })
        );

        setcarForm(emptyCarForm);
    };

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
                    {cars.map((car) => (
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
                <button type="button" onClick={addCar}>
                    Add Car
                </button>
            </form>
        </>
    );
}
