import { RefObject, useEffect } from 'react';
import { isInViewport } from 'utility/viewportUtilities';

export default function useScrollIntoView(
    ref: RefObject<HTMLDivElement>,
    current: boolean,
) {
    useEffect(() => {
        if (current && ref.current) {
            const el = ref.current;

            if (!isInViewport(el)) {
                const newPosition =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;

                window.scrollTo({ top: newPosition, behavior: 'smooth' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);
}
