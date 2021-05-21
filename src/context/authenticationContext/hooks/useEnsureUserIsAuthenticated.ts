import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { User } from '../../../model/User';
import { createUserFromFirebaseUserInfo } from '../../../model/factory/userFactory';

const provider = new firebase.auth.GoogleAuthProvider();

export default function useEnsureUserIsAuthenticated() {
    const [userInfo, loading, error] = useAuthState(firebase.auth());

    useEffect(() => {
        if (userInfo || loading || error || typeof window === 'undefined') {
            return;
        }

        // noinspection JSIgnoredPromiseFromCall
        firebase.auth().signInWithRedirect(provider);
    }, [userInfo, loading, error]);

    const user: User | null = userInfo
        ? createUserFromFirebaseUserInfo(userInfo)
        : null;

    return { user, loading, error };
}
