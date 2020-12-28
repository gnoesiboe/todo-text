import { useTodoContext } from './../../../context/todoContext/TodoContext';

export default function useClearCurrentOnOutsideClick() {
    const { clearCurrentItem } = useTodoContext();

    const onOutsideClick = () => clearCurrentItem();

    return onOutsideClick;
}
