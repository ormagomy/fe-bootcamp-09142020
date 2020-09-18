import React, { createContext, useContext } from 'react';
import { useCarStore } from '../hooks/useCarStore';
import { Car } from '../models/Cars';
import { CarToolStore } from '../models/CarTool';

const carToolStoreContext = createContext<CarToolStore>({} as CarToolStore);

const carList: Car[] = [
    { id: 1, make: 'Toyota', model: 'Tacoma', year: 2017, color: 'gray', price: 19999 },
    { id: 2, make: 'Tesla', model: 'Cyber Truck', year: 2022, color: 'metallic', price: 69999 },
];

export type CarToolStoreProviderProps = {
    children: React.ReactNode;
};

export function CarToolStoreProvider({ children }: CarToolStoreProviderProps) {
    return <carToolStoreContext.Provider value={useCarStore(carList)}>{children}</carToolStoreContext.Provider>;
}

export const useCarToolStoreContext = () => {
    return useContext(carToolStoreContext);
};
