import { generateId } from '../../utility/idGenerator';
import { FirestoreTodoListItem } from '../model/FirestoreTodoListItem';
import { emptyValue } from '../../model/factory/todoListItemFactory';

export const normalizeFirebaseTodoListItem = (
    partialData: Partial<FirestoreTodoListItem>,
): FirestoreTodoListItem => ({
    userId: generateId(),
    value: emptyValue,
    done: false,
    rank: 0,
    ...partialData,
});
