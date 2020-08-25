import { TodoListItem, Mode } from './../../../model/TodoListItem';
import { useTodoContext } from './../../../context/todoContext/TodoContext';

export default function useSwitchToEditModeOnSwitch(item: TodoListItem) {
    const { setItemMode } = useTodoContext();

    const onClick = () => setItemMode(item.id, Mode.Edit);

    return { onClick };
}
