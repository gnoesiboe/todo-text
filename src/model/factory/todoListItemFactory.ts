import { Mode, TodoListItem } from './../TodoListItem';
import { generateId } from './../../utility/idGenerator';

export const createEmptyToEdit = () => ({
    id: generateId(),
    value: '',
    done: false,
    mode: Mode.Edit,
});

const initialItem: TodoListItem = {
    id: generateId(),
    value: '...',
    done: false,
    mode: Mode.View,
};

export const createInitialCollection = () => [{ ...initialItem }];
