import { DatabaseIcon, SyncIcon } from '@primer/octicons-react';
import styled, { css } from 'styled-components/macro';
import { Button } from '../../../primitives/FilterButton/components/StyledComponents';
import rotate from '../../../primitives/keyframes/rotate';
import wobble from '../../../primitives/keyframes/wobble';

const containerPaddingRightLeft = 20;

export const Container = styled.div`
    border: 3px solid ${({ theme }) => theme.colors.first};
    padding: 30px ${containerPaddingRightLeft * 2}px 40px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 30px;

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        padding: 15px ${containerPaddingRightLeft}px 20px;
    }
`;

const connectionIndicatorCss = css`
    margin-top: 20px;
    position: fixed;
    top: 0;
    right: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
        top: 10px;
        right: 25px;
    }
`;

export const FetchingIndicator = styled(SyncIcon)`
    ${connectionIndicatorCss}
    animation: ${rotate} 2s linear infinite;
`;

export const SavingIdicator = styled(DatabaseIcon)`
    ${connectionIndicatorCss}
    animation: ${wobble} 2s linear infinite;
`;

export const Header = styled.div`
    background: #ddd;
    border-bottom: 1px solid #aaa;
    border-top: 1px solid #aaa;
    position: sticky;
    top: 0;
    display: block;
    z-index: ${({ theme }) => theme.zIndex.todoListHeader};
    padding: 5px 0px 5px 0;
    margin: 20px -${containerPaddingRightLeft * 2}px 20px -${containerPaddingRightLeft *
        2}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        margin-left: -${containerPaddingRightLeft}px;
        margin-right: -${containerPaddingRightLeft}px;
    }
`;

export const Heading = styled.h1`
    border-radius: 4px;
    padding: 0 5px 0 0;
    margin: 0 0 0 0;
    font-weight: bold;
    color: #fff;
    background: ${({ theme }) => theme.colors.fourth};

    &::first-letter {
        background: ${({ theme }) => theme.colors.first};
        padding: 0 10px 0 7px;
        margin-right: 3px;
    }
`;

export const AddTodoContainer = styled.div`
    flex: 1;
    margin-left: 20px;
`;

export const FilterContainer = styled.div`
    margin-right: 38px;
    ${Button} {
        margin-top: 5px;
    }
`;
