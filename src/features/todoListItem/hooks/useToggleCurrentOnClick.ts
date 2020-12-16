import { TodoListItem } from 'model/TodoListItem';
import { useTodoContext } from 'context/todoContext/TodoContext';

export default function useToggleCurrentOnClick(item: TodoListItem) {
    const { toggleCurrentItem, isEditing } = useTodoContext();

    const onClick = () => {
        if (isEditing) {
            return;
        }

        toggleCurrentItem(item.id);
    };

    return { onClick };
}
