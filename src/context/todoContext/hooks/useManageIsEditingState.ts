import { Dispatch, SetStateAction } from 'react';

export type StopEditHandler = () => void;

export type StartEditHandler = (ignoreCurrentItem?: boolean) => void;

export default function useManageIsEditingState(
    currentItem: string | null,
    isEditing: boolean,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
) {
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
