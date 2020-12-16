import { useManageCurrentActivity } from 'context/activityContext/ActivityContext';
import { useState } from 'react';

export enum Mode {
    Edit = 'edit',
    View = 'view',
}

export default function useManageMode() {
    const [mode, setMode] = useState<Mode>(Mode.View);

    const { startEditingNotes, stopEditingNotes } = useManageCurrentActivity();

    const startEdit = () => {
        setMode(Mode.Edit);
    };

    const stopEdit = () => {
        setMode(Mode.View);

        stopEditingNotes();
    };

    const onFocus = () => {
        startEditingNotes();
    };

    const onBlur = () => {
        setMode(Mode.View);

        stopEditingNotes();
    };

    return { mode, startEdit, stopEdit, onFocus, onBlur };
}
