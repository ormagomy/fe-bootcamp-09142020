import React, { useState } from 'react';

import { CarTool } from './CarTool';
import { Car } from '../models/Cars';
import { ColorTool } from './ColorTool';
import { Color } from '../models/Colors';

type CarToolHocProps = {
    cars: Car[];
    colors: Color[];
};

export function CarToolHoc({ cars, colors: defaultColors }: CarToolHocProps) {
    const [colors, setColors] = useState(defaultColors);

    const addColor = (color: Color) => {
        setColors(colors.concat(color));
    };

    return (
        <>
            <ColorTool colors={colors} onAddColor={addColor} />
            <CarTool cars={cars} colors={colors} />
        </>
    );
}
