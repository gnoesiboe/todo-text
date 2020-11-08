import React from 'react';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import FilterButton from './components/FilterButton';
import { ButtonGroup, FilterContainer } from './components/StyledComponents';

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
            <ButtonGroup title="filters">
                <DropdownItem>
                    <FilterButton
                        onClick={() => toggleHideNotActionable()}
                        active={hideNotActionable}
                        title="hide not-actionable"
                    />
                </DropdownItem>
                <DropdownItem>
                    <FilterButton
                        onClick={() => toggleHideDone()}
                        active={hideDone}
                        title="hide done"
                    />
                </DropdownItem>
                <DropdownItem>
                    <FilterButton
                        onClick={() => toggleHideEvening()}
                        active={hideEvening}
                        title="hide evening"
                    />
                </DropdownItem>
                <DropdownItem>
                    <FilterButton
                        onClick={() => toggleHideSnoozed()}
                        active={hideSnoozed}
                        title="hide snoozed"
                    />
                </DropdownItem>
            </ButtonGroup>
        </FilterContainer>
    );
};

export default FilterTodos;
