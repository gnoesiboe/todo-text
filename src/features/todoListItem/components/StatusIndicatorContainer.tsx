import React from 'react';
import { StatusIndicatorContainerWrapper } from './StyledComponents';

type Props = {
    children: React.ReactNode;
};

const StatusIndicatorContainer: React.FC<Props> = ({ children }) => {
    if (React.Children.count(children) === 0) {
        return null;
    }

    return (
        <StatusIndicatorContainerWrapper>
            {children}
        </StatusIndicatorContainerWrapper>
    );
};

export default StatusIndicatorContainer;
