export const convertHTMLCollectionToArray = <T = HTMLElement>(
    collection: HTMLCollection,
) => [].slice.call(collection) as T[];
