import { User } from '../User';

export const createUserFromFirebaseUserInfo = (userInfo: any): User => ({
    id: userInfo.uid,
    name: userInfo.displayName,
});
