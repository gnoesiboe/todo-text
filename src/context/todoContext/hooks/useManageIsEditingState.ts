import useStateWithSyncedRef from 'hooks/useStateWithSyncedRef';

export type StopEditHandler = () => void;

export type StartEditHandler = (ignoreCurrentItem?: boolean) => void;

export default function useManageIsEditingState(currentItem: string | null) {
    // used to  be able to do realtime checks if is editing, through 'checkIsEditing'
    // to be used in situations like promise and event callbacks where there might
    // only be access to old state.
    const [
        checkIsEditing,
        setIsEditing,
        isEditing,
    ] = useStateWithSyncedRef<boolean>(false);

    const stopEdit: StopEditHandler = () => setIsEditing(false);

    const startEdit: StartEditHandler = (
        ignoreCurrentItem: boolean = false,
    ) => {
        if (currentItem || ignoreCurrentItem) {
            setIsEditing(true);
        }
    };

    return { isEditing, checkIsEditing, stopEdit, startEdit };
}
