import { useState } from 'react';

export default function useToggleVisibility(initialValue: boolean = false) {
    const [visible, setVisible] = useState<boolean>(initialValue);

    const toggle = () => setVisible((currentValue) => !currentValue);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return { visible, toggle, show, hide };
}
