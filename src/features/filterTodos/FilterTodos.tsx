import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import ButtonGroupTitle from './components/ButtonGroupTitle';
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
        matchingFilters,
    } = useTodoContext();

    return (
        <FilterContainer>
            <ButtonGroup title={<ButtonGroupTitle />}>
                <Dropdown.Item as="div">
                    <FilterButton
                        onClick={() => toggleHideNotActionable()}
                        active={hideNotActionable}
                        title="hide not-actionable"
                        amount={matchingFilters.notActionable}
                    />
                </Dropdown.Item>
                <Dropdown.Item as="div">
                    <FilterButton
                        onClick={() => toggleHideDone()}
                        active={hideDone}
                        title="hide done"
                        amount={matchingFilters.done}
                    />
                </Dropdown.Item>
                <Dropdown.Item as="div">
                    <FilterButton
                        onClick={() => toggleHideEvening()}
                        active={hideEvening}
                        title="hide evening"
                        amount={matchingFilters.evening}
                    />
                </Dropdown.Item>
                <Dropdown.Item as="div">
                    <FilterButton
                        onClick={() => toggleHideSnoozed()}
                        active={hideSnoozed}
                        title="hide snoozed"
                        amount={matchingFilters.snoozed}
                    />
                </Dropdown.Item>
            </ButtonGroup>
        </FilterContainer>
    );
};

export default FilterTodos;
