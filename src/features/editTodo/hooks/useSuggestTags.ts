import { RefObject, useEffect } from 'react';
import suggestBox from 'suggest-box';

export default function useSuggestTags(
    textareaRef: RefObject<HTMLTextAreaElement>,
) {
    useEffect(() => {
        if (!textareaRef.current) {
            return;
        }

        const suggester = {
            '@': [
                {
                    title: '@snoozeUntil(tomorrow)',
                    value: '@snoozeUntil',
                },
                {
                    title: '@must',
                    value: '@must',
                },
                {
                    title: '@waiting(because)',
                    value: '@waiting',
                },
                {
                    title: '@quickfix(value)',
                    value: '@quickfix',
                },
            ],
        };

        suggestBox(textareaRef.current, suggester);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
