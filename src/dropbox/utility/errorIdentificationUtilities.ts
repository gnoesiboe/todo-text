import type { AxiosError } from 'axios';

export const isAxiosError = (error: Error): error is AxiosError => {
    // @ts-ignore Typescript does not know about axios error
    if (typeof error.isAxiosError === 'undefined') {
        return false;
    }

    const axiosError = error as AxiosError;

    return axiosError.isAxiosError;
};

export const isNotFoundResponseError = (error: Error): boolean =>
    isAxiosError(error) ? error.response?.status === 404 : false;

export const isAbortedRequestError = (error: Error): boolean =>
    isAxiosError(error) ? error.request.status === 0 && !error.response : false;

export const isLoggedOutError = (error: Error): boolean => {
    return isAxiosError(error) ? parseInt(error.request.status) === 401 : false;
};
