import { generateId } from 'utility/idGenerator';
import { TodoListItem } from '../TodoListItem';

export const emptyValue = '...';

export const createEmpty = (
    id: string = generateId(),
    userId: string,
    rank: number = 0,
): TodoListItem => ({
    id,
    value: '',
    done: false,
    rank,
    userId,
});
