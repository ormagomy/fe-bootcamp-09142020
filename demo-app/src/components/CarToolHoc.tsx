import React from 'react';

import { CarTool } from './CarTool';
import { ColorTool } from './ColorTool';
import { Color } from '../models/Colors';
import {useList} from '../hooks/useList';

type CarToolHocProps = {
    colors: Color[];
};

export function CarToolHoc({ colors: defaultColors }: CarToolHocProps) {
    const [colors, addColor] = useList(defaultColors);

    return (
        <>
            <ColorTool colors={colors} onAddColor={addColor} />
            <CarTool colors={colors} />
        </>
    );
}
