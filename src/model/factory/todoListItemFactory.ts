import { TodoListItem } from './../TodoListItem';
import { generateId } from './../../utility/idGenerator';

export const createEmpty = () => ({
    id: generateId(),
    value: '',
    done: false,
});

const initialItem: TodoListItem = {
    id: generateId(),
    value: '...',
    done: false,
};

export const createInitialCollection = () => [{ ...initialItem }];
