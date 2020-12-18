import { useState } from 'react';

export type StopEditHandler = () => void;

export type StartEditHandler = (ignoreCurrentItem?: boolean) => void;

export default function useManageIsEditingState(currentItem: string | null) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const stopEdit: StopEditHandler = () => setIsEditing(false);

    const startEdit: StartEditHandler = (
        ignoreCurrentItem: boolean = false,
    ) => {
        if (currentItem || ignoreCurrentItem) {
            setIsEditing(true);
        }
    };

    return { isEditing, stopEdit, startEdit };
}
