import styled from 'styled-components';
import { isCancelled, TodoListItem } from '../../../model/TodoListItem';

export const valueMarginLeft: string = '45px';

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
