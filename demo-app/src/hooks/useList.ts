import { useState } from 'react';

import { Item } from '../models/item';

type AppendItem<S> = (item: S) => void;
type ReplaceItem<S> = (item: S) => void;
type RemoveItem = (itemId: number) => void;

type UseList = <ItemType extends Item>(initialItems: ItemType[]) => [ItemType[], AppendItem<ItemType>, ReplaceItem<ItemType>, RemoveItem];

export const useList: UseList = <ItemType extends Item>(initialItems: ItemType[]) => {
    const [items, setItems] = useState([...initialItems]);

    const addItem: AppendItem<ItemType> = (itemForm) => {
        setItems(
            items.concat({
                ...itemForm,
                id: Math.max(...items.map((item) => item.id), 0) + 1,
            })
        );
    };

    const replaceItem: ReplaceItem<ItemType> = (itemToSave: ItemType) => {
        const index = items.findIndex((item) => itemToSave.id === item.id);
        const itemsUpdate = items.concat(); // Clone the items array
        itemsUpdate.splice(index, 1, itemToSave);
        setItems(itemsUpdate);
    };

    const deleteItem: RemoveItem = (itemId: number) => {
        setItems(items.filter((item) => item.id !== itemId));
    };

    return [items, addItem, replaceItem, deleteItem];
};
