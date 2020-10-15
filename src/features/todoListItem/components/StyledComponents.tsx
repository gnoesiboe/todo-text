import styled from 'styled-components';
import BaseCheckbox from '../../../primitives/Checkbox/Checkbox';
import {
    isCancelled,
    isQuickfix,
    isWaiting,
    TodoListItem,
} from '../../../model/TodoListItem';
import {
    QuestionIcon,
    AlertIcon,
    ChevronDownIcon,
} from '@primer/octicons-react';

interface ItemContextProps {
    item: TodoListItem;
    isDragging: boolean;
}

const statusTop: string = '11px';
const valueMarginLeft: string = '45px';
const statusIconLeft: string = `calc(${valueMarginLeft} - 1px)`;

export const Container = styled.div<{
    item: TodoListItem;
    current: boolean;
    isDragging: boolean;
    isEditing: boolean;
}>`
    position: relative;
    margin: 0 0 10px -10px;
    padding: 5px 0 3px 0;
    border-radius: 5px;
    transition: max-height 1s ease-in;

    ${({ isEditing, current }) => {
        if (!current) {
            return null;
        }

        return isEditing
            ? 'background: rgba(231, 111, 81, 0.3) !important;'
            : 'background: #eee;';
    }}

    ${({ isDragging, theme }) =>
        isDragging &&
        `
            color: white !important;
            background: ${theme.colors.third};
        `}
`;

const hasPrefixStatus = (item: TodoListItem) =>
    isWaiting(item) || isQuickfix(item);

export const Checkbox = styled(BaseCheckbox)<ItemContextProps>`
    position: absolute;
    left: 10px;
    top: ${statusTop};

    ${({ isDragging }) => isDragging && `visibility: hidden;`}
`;

export const Value = styled.div<{
    item: TodoListItem;
    isDragging: boolean;
    current: boolean;
}>`
    margin-left: ${valueMarginLeft};
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    color: #666;
    padding: 0 0 5px;
    cursor: pointer;

    ${({ item }) => isCancelled(item) && `text-decoration: line-through;`}
    ${({ item }) =>
        item.done &&
        `
            color: #ddd;

            * {
                color: #ddd !important;
            }
        `}

    ${({ isDragging }) => isDragging && `visibility: hidden;`}

    ${({ item }) => hasPrefixStatus(item) && !item.done && 'text-indent: 25px;'}

    .todo-list-item__value__removed {
        text-decoration: line-through;
    }

    .todo-list-item__value__heading {
        color: ${({ theme }) => theme.colors.fourth};
        display: block;
        font-weight: bold;
        text-transform: uppercase;
        margin: 30px 0 0;
        border-bottom: 1px solid #e76f51;
        margin-left: -34px;
        margin-bottom: 0px;
        padding: 0;
    }

    .todo-list-item__value__tag {
        color: #999;
        font-size: 0.9em;
    }

    .todo-list-item__value__link {
        color: #333;
        text-decoration: underline;
    }

    .todo-list-item__value__deadline {
        color: ${({ theme }) => theme.colors.third};
    }

    .todo-list-item__value__project {
        font-weight: bold;
        text-transform: uppercase;
    }

    .todo-list-item__value__project:after {
        content: ' → ';
    }

    .todo-list-item__value__summary {
        padding-right: 15px;
    }

    .todo-list-item__value__note {
        font-size: 0.8em !important;
        min-height: 1em;
        display: none;
        padding-right: 5px;

        ${({ current }) => current && 'display: block;'}
    }

    .todo-list-item__value__sub-item {
        padding-left: 40px;
    }

    .todo-list-item__value__sub-item:before {
        content: '◻ ';
        margin-left: -16px;
    }

    .todo-list-item__value__sub-item--checked:before {
        content: '⊠ ';
    }
`;

export const WaitingIcon = styled(QuestionIcon)`
    position: absolute;
    left: ${statusIconLeft};
    top: ${statusTop};
    color: ${({ theme }) => theme.colors.third};
`;

export const QuickfixIcon = styled(AlertIcon)`
    position: absolute;
    left: ${statusIconLeft};
    top: ${statusTop};
    color: ${({ theme }) => theme.colors.success};

    &:after {
        content: ' - ';
    }
`;

export const DragHandle = styled.div<{ current: boolean }>`
    position: absolute;
    left: -17px;
    top: 0px;
    cursor: pointer;
    height: 100%;
    background: #ccc;
    color: #fff;
    padding: 0 4px;
    box-sizing: content-box;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: ${({ current }) => (current ? 'flex' : 'none')};
`;

export const HasNotesIndicator = styled(ChevronDownIcon)`
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0.3;
`;
