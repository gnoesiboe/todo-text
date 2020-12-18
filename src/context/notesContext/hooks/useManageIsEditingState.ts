import { useState } from 'react';

export default function useManageIsEditingSTate() {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const startEditing = () => {
        setIsEditing(true);
    };

    const stopEditing = () => {
        setIsEditing(false);
    };

    return { isEditing, startEditing, stopEditing };
}
