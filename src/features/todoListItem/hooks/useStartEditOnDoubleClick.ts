import { TodoListItem } from './../../../model/TodoListItem';
import { useTodoContext } from './../../../context/todoContext/TodoContext';

export default function useStartEditOnDoubleClick(item: TodoListItem) {
    const { startEdit, markCurrentItem, isEditing } = useTodoContext();

    const onDoubleClick = () => {
        if (isEditing) {
            return;
        }

        markCurrentItem(item.id);
        startEdit();
    };

    return { onDoubleClick };
}
