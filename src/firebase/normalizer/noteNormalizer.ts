import { FirestoreNote } from '../model/FirestoreNote';

export const normalizeFirestoreNote = (
    partialData: Partial<FirestoreNote>,
): FirestoreNote => ({
    value: '',
    ...partialData,
});
