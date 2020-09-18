import React from 'react';

import { CarTool } from './CarTool';
import { Car } from '../models/Cars';
import { ColorTool } from './ColorTool';
import { Color } from '../models/Colors';
import {useList} from '../hooks/useList';

type CarToolHocProps = {
    cars: Car[];
    colors: Color[];
};

export function CarToolHoc({ cars, colors: defaultColors }: CarToolHocProps) {
    const [colors, addColor] = useList(defaultColors);

    return (
        <>
            <ColorTool colors={colors} onAddColor={addColor} />
            <CarTool cars={cars} colors={colors} />
        </>
    );
}
