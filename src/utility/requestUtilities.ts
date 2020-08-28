import queryString from 'query-string';
import objectToFormData from 'object-to-formdata';

export const parseQueryString = (value: string) => queryString.parse(value);

export const createQueryString = (values: { [key: string]: any }) =>
    queryString.stringify(values);

export const formatBodyAsFormData = (values: Object): FormData => {
    return objectToFormData.serialize(values, {
        indices: true,
    });
};
