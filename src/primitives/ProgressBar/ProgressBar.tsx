import React from 'react';
import { Wrapper, Bar } from './components/StyledComponents';

type Props = {
    done: number;
    todo: number;
    total: number;
};

const ProgressBar: React.FC<Props> = ({ done, total }) => {
    if (total === 0) {
        return null;
    }

    const percentage = done === 0 ? 0 : Math.round((done / total) * 100);

    return (
        <Wrapper>
            <Bar percentage={percentage} />
        </Wrapper>
    );
};

export default ProgressBar;
