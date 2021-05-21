import firebase from 'firebase';

export interface FirestoreNote extends firebase.firestore.DocumentData {
    value: string;
}
