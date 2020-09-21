import { Reducer } from 'react';
import { AddColorAction, ADD_COLOR_ACTION } from '../actions/colorToolActions';
import { Color } from '../models/Colors';

const colorList: Color[] = [
    { id: 1, name: 'red', hexcode: 'ff0000' },
    { id: 2, name: 'green', hexcode: 'ff0000' },
    { id: 3, name: 'blue', hexcode: 'ff0000' },
    { id: 4, name: 'gray', hexcode: 'ff0000' },
    { id: 5, name: 'metallic', hexcode: 'ff0000' },
];

export const colorsReducer: Reducer<Color[], AddColorAction> = (colors = colorList, action) => {
    if (action.type === ADD_COLOR_ACTION) {
        return [
            ...colors,
            {
                ...action.payload.colorForm,
                id: Math.max(...colors.map(color => color.id), 0) + 1,
            },
        ];
    }

    return colors;
};
