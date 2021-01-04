import styled from 'styled-components';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import BaseCheckbox from 'primitives/Checkbox/Checkbox';

type Props = {
    item: TodoListItem<ParsedTodoValue | string>;
    isDragging: boolean;
};

const Checkbox = styled(BaseCheckbox)<Props>`
    position: absolute;
    left: 10px;
    top: 11px;

    ${({ isDragging }) => isDragging && `visibility: hidden;`}
`;

export default Checkbox;
