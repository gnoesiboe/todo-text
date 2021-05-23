import React from 'react';
import useCountAppliedFilters from '../hooks/useCountAppliedFilters';
import Badge from './Badge';
import { FilterIcon } from '@primer/octicons-react';
import useWindowDimensions from '../../../hooks/useWIndowDimensions';
import { breakpoints } from '../../../constants/breakpoints';

const ButtonGroupTitle: React.FC = () => {
    const noOfAppliedFilters = useCountAppliedFilters();

    const { width } = useWindowDimensions();

    return (
        <>
            {width >= breakpoints.medium ? (
                'Filters'
            ) : (
                <FilterIcon size="small" />
            )}

            {noOfAppliedFilters > 0 && <Badge>{noOfAppliedFilters}</Badge>}
        </>
    );
};

export default ButtonGroupTitle;
