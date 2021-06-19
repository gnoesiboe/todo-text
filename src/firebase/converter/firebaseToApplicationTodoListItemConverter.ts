import firebase from 'firebase/app';
import { normalizeFirebaseTodoListItem } from '../normalizer/todoListItemNormalizer';
import { TodoListItem } from '../../model/TodoListItem';
import { FirestoreTodoListItem } from '../model/FirestoreTodoListItem';

export const firebaseToApplicationTodoListItemConverter: firebase.firestore.FirestoreDataConverter<TodoListItem> =
    {
        toFirestore(todoListItem: TodoListItem): FirestoreTodoListItem {
            const { id, ...otherProps } = todoListItem;

            return normalizeFirebaseTodoListItem(otherProps);
        },
        fromFirestore(snapshot, options) {
            const data = normalizeFirebaseTodoListItem(snapshot.data(options));

            return {
                ...data,
                id: snapshot.id,
            };
        },
    };
