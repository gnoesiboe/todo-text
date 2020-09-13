import styled from 'styled-components';
import BaseCheckbox from '../../../primitives/Checkbox/Checkbox';
import { isCancelled, TodoListItem } from '../../../model/TodoListItem';

interface ItemContextProps {
    item: TodoListItem;
}

interface ItemCurrentContextProps extends ItemContextProps {
    current: boolean;
}

export const Container = styled.div<ItemCurrentContextProps>`
    position: relative;
    margin: 0 0 5px -10px;
    padding: 5px 3px 3px 0;
    border-radius: 5px;

    ${({ item }) => item.done && ``};
    ${({ current }) => current && `background: rgba(231, 111, 81, 0.3);`};
`;

export const Checkbox = styled(BaseCheckbox)<ItemContextProps>`
    position: absolute;
    left: 10px;
    top: 11px;
`;

export const Value = styled.div<ItemContextProps>`
    margin-left: 37px;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    color: #666;

    ${({ item }) => isCancelled(item) && `text-decoration: line-through;`}
    ${({ item }) =>
        item.done &&
        `
            color: #ddd;

            * {
                color: #ddd !important;
            }
        `}

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
        margin-left: -30px;
    }

    .todo-list-item__value__tag {
        color: #999;
        font-size: 0.9em;
    }

    .todo-list-item__value__link {
        color: #333;
        text-decoration: underline;
    }

    .todo-list-item__value__project {
        font-weight: bold;
        text-transform: uppercase;
    }

    .todo-list-item__value__project:after {
        content: ' → ';
    }

    .todo-list-item__value__summary + .todo-list-item__value__note {
        margin-top: 20px;
    }

    .todo-list-item__value__note {
        font-size: 0.8em !important;
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