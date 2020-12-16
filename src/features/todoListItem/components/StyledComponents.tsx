import styled, { css } from 'styled-components/macro';
import BaseCheckbox from '../../../primitives/Checkbox/Checkbox';
import { isCancelled, TodoListItem } from '../../../model/TodoListItem';
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

export const Container = styled.div<{
    item: TodoListItem;
    current: boolean;
    isDragging: boolean;
    isEditing: boolean;
    isSorting: boolean;
}>`
    position: relative;
    margin: 0 0
        ${({ current, isSorting }) => (current && !isSorting ? 30 : 5)}px -10px;
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

    .todo-list-item__value__code {
        color: #777;
        background: #eee;
        padding: 2px 3px;
        border-radius: 2px;
        font-size: 0.9em;
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
        padding-right: 15px;
        display: ${({ current }) => (current ? 'block' : 'none')};
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

const StatusIndicatorIconStyling = css`
    margin-right: 5px;
    display: inline;
`;

export const WaitingIcon = styled(QuestionIcon)`
    ${StatusIndicatorIconStyling}
    color: ${({ theme }) => theme.colors.fourth};
`;

export const QuickfixIcon = styled(AlertIcon)`
    ${StatusIndicatorIconStyling}
    color: ${({ theme }) => theme.colors.success};
`;

export const StatusIndicatorContainerWrapper = styled.div`
    position: absolute;
    left: calc(-${valueMarginLeft} - 20px);
    top: 5px;
    z-index: ${({ theme }) => theme.zIndex.statusIndicatorContainerWrapper};

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
        display: none;
    }
`;

export const HasNotesIndicator = styled(ChevronDownIcon)`
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0.3;
`;
