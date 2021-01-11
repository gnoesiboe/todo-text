import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTodoContext } from 'context/todoContext/TodoContext';
import ButtonGroup from './components/ButtonGroup';
import ButtonGroupTitle from './components/ButtonGroupTitle';
import Container from './components/Container';
import FilterButton from './components/FilterButton';

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
        hideNonePriority,
        toggleHideNonePriority,
    } = useTodoContext();

    return (
        <Container>
            <ButtonGroup title={<ButtonGroupTitle />}>
                <Dropdown.Item as="div">
                    <FilterButton
                        onClick={() => toggleHideNonePriority()}
                        active={hideNonePriority}
                        title="hide non-priority"
                        amount={matchingFilters.nonePriority}
                    />
                </Dropdown.Item>
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
        </Container>
    );
};

export default FilterTodos;
