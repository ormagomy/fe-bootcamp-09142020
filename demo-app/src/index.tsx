import React from 'react';
import ReactDOM from 'react-dom';

import { CarToolHoc } from './components/CarToolHoc';
import { Color } from './models/Colors';

import { CarToolStoreProvider } from './contexts/carToolContext';

const colorList: Color[] = [
    { id: 1, name: 'red', hexcode: 'ff0000' },
    { id: 2, name: 'green', hexcode: 'ff0000' },
    { id: 3, name: 'blue', hexcode: 'ff0000' },
    { id: 4, name: 'gray', hexcode: 'ff0000' },
    { id: 5, name: 'metallic', hexcode: 'ff0000' },
];

ReactDOM.render(
    <CarToolStoreProvider>
        <CarToolHoc colors={colorList} />
    </CarToolStoreProvider>,
    document.querySelector('#root')
);
