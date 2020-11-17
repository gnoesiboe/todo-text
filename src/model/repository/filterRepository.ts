export type StoredFilters = {
    hideNotActionable: boolean;
    hideDone: boolean;
    hideSnoozed: boolean;
};

const namespace = 'filters';

export const get = (): StoredFilters | null => {
    try {
        const value = localStorage.getItem(namespace);

        return value ? JSON.parse(value) : null;
    } catch (error) {
        return null;
    }
};

export const save = (filters: StoredFilters) => {
    try {
        localStorage.setItem(namespace, JSON.stringify(filters));
    } catch (error) {
        return null;
    }
};
