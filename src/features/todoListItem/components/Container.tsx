import styled from 'styled-components';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import { motion } from 'framer-motion';

const Container = styled(motion.div)<{
    item: TodoListItem<ParsedTodoValue | string>;
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

export default Container;
