import styled from 'styled-components';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import { motion } from 'framer-motion';

const compensationMargin = 10;
const currentBorderWidth = 12;

const Container = styled(motion.div)<{
    item: TodoListItem<ParsedTodoValue | string>;
    current: boolean;
    isDragging: boolean;
    isEditing: boolean;
    isSorting: boolean;
}>`
    position: relative;
    margin: 0 0
        ${({ current, isSorting }) => (current && !isSorting ? 30 : 5)}px -${compensationMargin}px;
    padding: 5px 0 3px 0;
    border-radius: 3px;
    transition: background-color 0.3s;
    background: #fff;

    ${({ isEditing, current }) => {
        if (!current) {
            return null;
        }

        return isEditing
            ? 'background-color: rgba(231, 111, 81, 0.3) !important;'
            : `
                background-color: #eee;
                border-left: ${currentBorderWidth}px solid #ccc;
                margin-left: -${currentBorderWidth + compensationMargin}px;
            `;
    }}

    ${({ isDragging, theme }) =>
        isDragging &&
        `
            color: white !important;
            background: ${theme.colors.third};
        `}
        
    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
        margin-left: 0;
        border-left: none;
    }
`;

export default Container;
