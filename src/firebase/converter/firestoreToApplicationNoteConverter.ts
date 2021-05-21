import firebase from 'firebase/app';
import { Note } from '../../model/Note';
import { normalizeFirestoreNote } from '../normalizer/noteNormalizer';
import { FirestoreNote } from '../model/FirestoreNote';

export const firestoreToApplicationNoteConverter: firebase.firestore.FirestoreDataConverter<Note> = {
    toFirestore(note: Note): FirestoreNote {
        const { id, ...otherProps } = note;

        return normalizeFirestoreNote(otherProps);
    },
    fromFirestore(snapshot, options) {
        const data = normalizeFirestoreNote(snapshot.data(options));

        return {
            ...data,
            id: snapshot.id,
        };
    },
};
