import { get } from 'lodash';

export const isFileNotFoundError = (error: Error): boolean => {
    const errorSummary = get(error, 'error.error_summary');

    return (
        typeof errorSummary === 'string' && errorSummary.includes('not_found')
    );
};

export const isLoggedOutError = (error: Error): boolean => {
    // @ts-ignore → Typescript does not know about status being on error
    return typeof error.status !== 'undefined' && error.status === 401;
};
