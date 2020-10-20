import { Dispatch, SetStateAction } from 'react';

export type ToggleCurrentItemHandler = (id: string) => void;

export type MarkCurrentItemHandler = (id: string) => void;

export type ClearCurrentItemHandler = () => void;

export default function useManageCurrentItem(
    isEditing: boolean,
    currentItem: string | null,
    setCurrentItem: Dispatch<SetStateAction<string | null>>,
) {
    const toggleCurrentItem: ToggleCurrentItemHandler = (id) => {
        setCurrentItem((currentId) => (currentId === id ? null : id));
    };

    const markCurrentItem: MarkCurrentItemHandler = (id) => {
        setCurrentItem(id);
    };

    const clearCurrentItem: ClearCurrentItemHandler = () => {
        if (isEditing || !currentItem) {
            return;
        }

        setCurrentItem(null);
    };

    return { toggleCurrentItem, markCurrentItem, clearCurrentItem };
}
