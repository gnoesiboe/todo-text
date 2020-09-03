import { TodoListItem } from './../../../model/TodoListItem';
import { useTodoContext } from './../../../context/todoContext/TodoContext';

export default function useSwitchToEditModeOnSwitch(item: TodoListItem) {
    const { setCurrentItem } = useTodoContext();

    const onClick = () => setCurrentItem(item.id);

    return { onClick };
}
