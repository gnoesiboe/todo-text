import firebase from 'firebase/app';
import { firestoreToApplicationNoteConverter } from '../firebase/converter/firestoreToApplicationNoteConverter';
import { Note } from '../model/Note';

const collectionName = 'notes';

export const fetchOneWithUserId = async (
    userId: string,
): Promise<Note | null> => {
    const result = await firebase
        .firestore()
        .collection(collectionName)
        .withConverter(firestoreToApplicationNoteConverter)
        .doc(userId)
        .get();

    return result.data() || null;
};

export const persist = async (
    userId: string,
    values: Partial<Note>,
): Promise<boolean> => {
    try {
        await firebase
            .firestore()
            .collection(collectionName)
            .doc(userId)
            .set(values);

        return true;
    } catch (error) {
        console.error('Something went wrong when persisting notes', error);

        return false;
    }
};
