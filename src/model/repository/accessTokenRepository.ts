const storageNamespace = 'at';

export const save = (token: string): void => {
    try {
        localStorage.setItem(storageNamespace, token);
    } catch (error) {
        // do nothing
    }
};

export const get = (): string | null => {
    try {
        return localStorage.getItem(storageNamespace);
    } catch (error) {
        return null;
    }
};

export const clear = () => save('');
