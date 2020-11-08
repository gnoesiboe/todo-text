import React from 'react';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import FilterButton from '../../primitives/FilterButton/FilterButton';
import { FilterContainer } from './components/StyledComponents';

const FilterTodos: React.FC = () => {
    const {
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        hideEvening,
        toggleHideEvening,
        hideSnoozed,
        toggleHideSnoozed,
    } = useTodoContext();

    return (
        <FilterContainer>
            <FilterButton
                onClick={() => toggleHideNotActionable()}
                active={hideNotActionable}
                title="hide not-actionable"
            />
            <FilterButton
                onClick={() => toggleHideDone()}
                active={hideDone}
                title="hide done"
            />
            <FilterButton
                onClick={() => toggleHideEvening()}
                active={hideEvening}
                title="hide evening"
            />
            <FilterButton
                onClick={() => toggleHideSnoozed()}
                active={hideSnoozed}
                title="hide snoozed"
            />
        </FilterContainer>
    );
};

export default FilterTodos;
