import { useState } from 'react';
export type StopEditHandler = () => void;

export type StartEditHandler = () => void;

export default function useManageIsEditingState(currentItem: string | null) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const stopEdit: StopEditHandler = () => setIsEditing(false);

    const startEdit: StartEditHandler = () => {
        if (currentItem) {
            setIsEditing(true);
        }
    };

    return { isEditing, stopEdit, startEdit };
}
