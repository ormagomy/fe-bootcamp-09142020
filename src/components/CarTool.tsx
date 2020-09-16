import React, { ChangeEvent, useState } from 'react';

import { Car } from '../models/Cars';
import { CarTable } from './CarTable';
import { ToolHeader } from './ToolHeader';

export type CarToolProps = {
    cars: Car[];
};

export function CarTool(props: CarToolProps) {
    const [cars, setCars] = useState([...props.cars]);

    const emptyCarForm = {
        make: '',
        model: '',
        year: 2000,
        color: '',
        price: 0,
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
                ...carForm,
            })
        );

        setcarForm(emptyCarForm);
    };

    return (
        <>
            <ToolHeader headerText="Car tool" />
            <CarTable cars={cars} />
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
