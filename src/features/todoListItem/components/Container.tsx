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
    transition: max-height 1s ease-in, background-position 0.3s ease-out;
    background-size: 200% 100%;
    background-image: linear-gradient(to right, #fff 50%, #eee 50%);

    ${({ isEditing, current }) => {
        if (!current) {
            return null;
        }

        return isEditing
            ? 'background: rgba(231, 111, 81, 0.3) !important;'
            : `background-position: -100% 0;`;
    }}

    ${({ isDragging, theme }) =>
        isDragging &&
        `
            color: white !important;
            background: ${theme.colors.third};
        `}
`;

export default Container;
