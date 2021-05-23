import { useEffect, useState } from 'react';

type Dimensions = {
    width: number;
    height: number;
};

const determineCurrentDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

export default function useWindowDimensions(): Dimensions {
    const [dimensions, setDimensions] = useState<Dimensions>(
        determineCurrentDimensions(),
    );

    useEffect(() => {
        const onWindowResize = () => {
            setDimensions(determineCurrentDimensions());
        };

        window.addEventListener('resize', onWindowResize);

        return () => window.removeEventListener('resize', onWindowResize);
    }, []);

    return dimensions;
}
