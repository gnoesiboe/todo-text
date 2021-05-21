import { TodoListItem, TodoListItemCollection } from '../model/TodoListItem';
import firebase from 'firebase/app';
import { firebaseToApplicationTodoListItemConverter } from '../firebase/converter/firebaseToApplicationTodoListItemConverter';

const collectionName = 'todoListItems';

export const fetchAllForUser = async (
    userId: string,
): Promise<TodoListItemCollection> => {
    try {
        const snapshot = await firebase
            .firestore()
            .collection(collectionName)
            .withConverter(firebaseToApplicationTodoListItemConverter)
            .where('userId', '==', userId)
            .orderBy('rank')
            .get();

        return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
        console.error('could not fetch all todo list items for user', error);

        throw error;
    }
};

export const fetchOneWithId = async (
    id: string,
): Promise<TodoListItem | null> => {
    const result = await firebase
        .firestore()
        .collection(collectionName)
        .withConverter(firebaseToApplicationTodoListItemConverter)
        .doc(id)
        .get();

    return result.data() || null;
};

export const persistItemUpdate = async (
    id: string,
    updates: Partial<Omit<TodoListItem, 'id'>>,
) => {
    try {
        await firebase
            .firestore()
            .collection(collectionName)
            .doc(id)
            .update(updates);

        return true;
    } catch (error) {
        console.error('Something went wrong when updating todo', error);

        return false;
    }
};

export const batchUpdateItems = async (
    updates: Record<string, Partial<Omit<TodoListItem, 'id'>>>,
): Promise<boolean> => {
    try {
        const batch = firebase.firestore().batch();

        Object.keys(updates).forEach((id) => {
            batch.update(
                firebase.firestore().collection(collectionName).doc(id),
                updates[id],
            );
        });

        await batch.commit();

        return true;
    } catch (error) {
        console.error('Something went wrong when batch updating todos', error);

        return false;
    }
};

export const persist = async (item: TodoListItem): Promise<boolean> => {
    console.log('persist', item);

    try {
        await firebase
            .firestore()
            .collection(collectionName)
            .withConverter(firebaseToApplicationTodoListItemConverter)
            .doc(item.id)
            .set(item);

        return true;
    } catch (error) {
        console.error('Could not persist new todo', error);

        return false;
    }
};

export const remove = async (id: string): Promise<boolean> => {
    try {
        await firebase.firestore().collection(collectionName).doc(id).delete();

        return true;
    } catch (error) {
        console.error('Something went wrong when deleting an item', error);

        return false;
    }
};
