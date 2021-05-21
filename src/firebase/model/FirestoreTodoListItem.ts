import firebase from 'firebase';

export interface FirestoreTodoListItem extends firebase.firestore.DocumentData {
    userId: string;
    value: string;
    done: boolean;
    rank: number;
}
