import React from 'react';
import ReactDOM from 'react-dom';

import { CarTool } from './components/CarTool';
import { Car } from "./models/Cars";
import { ColorTool } from './components/ColorTool';
import { Color } from "./models/Colors";

const colorList: Color[] = [
  { id: 1, name: 'red', hexcode: 'ff0000' },
  { id: 2, name: 'green', hexcode: 'ff0000' },
  { id: 3, name: 'blue', hexcode: 'ff0000' },
];

const carList: Car[] = [
  { id: 1, make: 'Toyota', model: 'Tacoma', year: 2017, color: 'gray', price: 19999 },
  { id: 2, make: 'Tesla', model: 'Cyber Truck', year: 2022, color: 'metallic', price: 69999 },
];

ReactDOM.render(
    <>
        <ColorTool colors={colorList} />
        <CarTool cars={carList} />
    </>,
    document.querySelector('#root')
);
