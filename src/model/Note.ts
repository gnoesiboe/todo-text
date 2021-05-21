import { FirestoreNote } from '../firebase/model/FirestoreNote';

export interface Note extends FirestoreNote {
    id: string;
}
