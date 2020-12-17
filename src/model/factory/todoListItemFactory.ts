import { TodoListItem } from './../TodoListItem';
import { generateId } from 'utility/idGenerator';

export const emptyValue = '...';

export const createEmpty = (id: string = generateId()) => ({
    id,
    value: '',
    done: false,
});

const initialItem: TodoListItem = {
    id: generateId(),
    value: emptyValue,
    done: false,
};

export const createInitialCollection = () => [{ ...initialItem }];
