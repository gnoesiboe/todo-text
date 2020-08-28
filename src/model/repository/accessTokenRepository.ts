import {
    get as getFromStorage,
    write as writeToStorage,
} from '@freshheads/javascript-essentials/build/storage/localStorage';

const storageNamespace = 'at';

export const save = (token: string): void => {
    writeToStorage(storageNamespace, token, true);
};

export const get = (): string | null => getFromStorage(storageNamespace, true);
