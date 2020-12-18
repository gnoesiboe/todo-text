import { useManageEditingNotesState } from 'context/notesContext/NotesContext';
import { useState } from 'react';

export enum Mode {
    Edit = 'edit',
    View = 'view',
}

export default function useManageMode() {
    const [mode, setMode] = useState<Mode>(Mode.View);

    const { startEditing, stopEditing } = useManageEditingNotesState();

    const startEdit = () => {
        setMode(Mode.Edit);
    };

    const stopEdit = () => {
        setMode(Mode.View);

        stopEditing();
    };

    const onFocus = () => {
        startEditing();
    };

    const onBlur = () => {
        setMode(Mode.View);

        stopEditing();
    };

    return { mode, startEdit, stopEdit, onFocus, onBlur };
}
