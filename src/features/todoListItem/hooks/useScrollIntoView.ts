import { RefObject, useEffect } from 'react';
import { isInViewport } from 'utility/viewportUtilities';

// take into account height of sticky header (on mobile and desktop);
const offset = 300;

export default function useScrollIntoView(
    ref: RefObject<HTMLDivElement>,
    current: boolean,
) {
    useEffect(() => {
        if (current && ref.current) {
            const el = ref.current;

            if (!isInViewport(el)) {
                const newPosition =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;

                window.scrollTo({ top: newPosition, behavior: 'smooth' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);
}
