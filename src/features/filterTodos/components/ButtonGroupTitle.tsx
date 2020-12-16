import React from 'react';
import useCountAppliedFilters from '../hooks/useCountAppliedFilters';
import Badge from './Badge';

const ButtonGroupTitle: React.FC = () => {
    const noOfAppliedFilters = useCountAppliedFilters();

    return (
        <>
            Filters
            {noOfAppliedFilters > 0 && <Badge>{noOfAppliedFilters}</Badge>}
        </>
    );
};

export default ButtonGroupTitle;
