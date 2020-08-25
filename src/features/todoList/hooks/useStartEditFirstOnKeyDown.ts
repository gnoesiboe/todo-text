import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { useEffect } from 'react';

export default function useStartEditFirstOnKeyDown() {
    const { items, startEditFirst } = useTodoContext();

    useEffect(() => {
        const onKeyDown = () => startEditFirst();

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [items]);
}
