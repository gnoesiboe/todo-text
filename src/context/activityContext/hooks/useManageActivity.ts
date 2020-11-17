import { useState } from 'react';

export default function useManageActivity() {
    const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);

    const startEditingNotes = () => {
        setIsEditingNotes(true);
    };

    const stopEditingNotes = () => {
        setIsEditingNotes(false);
    };

    return { isEditingNotes, startEditingNotes, stopEditingNotes };
}
