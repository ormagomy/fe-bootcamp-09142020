import React from 'react';
import ReactDOM from 'react-dom';

import { CarToolHoc } from './components/CarToolHoc';
import { Car } from './models/Cars';
import { Color } from './models/Colors';

const colorList: Color[] = [
    { id: 1, name: 'red', hexcode: 'ff0000' },
    { id: 2, name: 'green', hexcode: 'ff0000' },
    { id: 3, name: 'blue', hexcode: 'ff0000' },
    { id: 4, name: 'gray', hexcode: 'ff0000' },
    { id: 5, name: 'metallic', hexcode: 'ff0000' },
];

const carList: Car[] = [
    { id: 1, make: 'Toyota', model: 'Tacoma', year: 2017, color: 'gray', price: 19999 },
    { id: 2, make: 'Tesla', model: 'Cyber Truck', year: 2022, color: 'metallic', price: 69999 },
];

ReactDOM.render(<CarToolHoc cars={carList} colors={colorList} />, document.querySelector('#root'));
