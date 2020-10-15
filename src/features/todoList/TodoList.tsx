import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import {
    Container,
    Header,
    FilterContainer,
    Heading,
    SavingIdicator,
    FetchingIndicator,
} from './components/StyledComponents';
import FilterButton from '../../primitives/FilterButton/FilterButton';
import useNavigateToNextItemOnDownKeyPressed from './hooks/useNavigateToNextItemOnDownKeyPressed';
import useNavigateToPreviousItemOnUpKeyPressed from './hooks/useNavigateToPreviousItemOnUpKeyPressed';
import useMoveItemUpOnKeyboardShortcutPressed from './hooks/useMoveItemUpOnKeyboardShortcutPressed';
import useMoveItemDownOnKeyboardShortcutPressed from './hooks/useMoveItemDownOnKeyboardShortcutPressed';
import useClearCurrentOnKeyPressed from './hooks/useClearCurrentOnKeyPressed';
import useDeleteCurrentOnKeyPressed from './hooks/useDeleteCurrentOnKeyPressed';
import useToggleDoneStatusOnKeyPressed from './hooks/useToggleDoneStatusOnKeyPressed';
import useAddNewItemOnKeyboardShortcutPressed from './hooks/useAddNewItemOnKeyboardShortcutPressed';

const TodoList: React.FC = () => {
    const {
        filteredItems,
        isFetching,
        isSaving,
        currentItem,
        hideDone,
        hideNotActionable,
        toggleHideDone,
        toggleHideNotActionable,
    } = useTodoContext();

    useNavigateToNextItemOnDownKeyPressed();
    useNavigateToPreviousItemOnUpKeyPressed();
    useMoveItemUpOnKeyboardShortcutPressed();
    useMoveItemDownOnKeyboardShortcutPressed();
    useClearCurrentOnKeyPressed();
    useDeleteCurrentOnKeyPressed();
    useToggleDoneStatusOnKeyPressed();
    useAddNewItemOnKeyboardShortcutPressed();

    return (
        <Container>
            {isSaving && <SavingIdicator />}
            {isFetching && <FetchingIndicator />}
            <Header>
                <Heading>ToDo</Heading>
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
                </FilterContainer>
            </Header>
            {filteredItems.map((item, index) => (
                <TodoListItem
                    key={item.id}
                    index={index}
                    item={item}
                    current={currentItem === item.id}
                />
            ))}
        </Container>
    );
};

export default TodoList;
