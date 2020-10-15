import { DatabaseIcon, SyncIcon } from '@primer/octicons-react';
import styled, { keyframes } from 'styled-components';
import { Button } from '../../../primitives/FilterButton/components/StyledComponents';

export const Container = styled.div`
    border: 3px solid #264653;
    padding: 30px 40px 40px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 30px;
`;

const rotate = keyframes`
   0% { transform: rotate(0deg); }
   50% { transform: rotate(180deg); }
`;

const wobble = keyframes`
   0% { transform: rotate(0deg); }
   15% { transform: rotate(-20deg); }
   30% { transform: rotate(12deg); }
   45% { transform: rotate(-12deg); }
   60% { transform: rotate(8deg); }
   75% { transform: rotate(-4deg); }
   100% { transform: rotate(0deg); }
`;

export const FetchingIndicator = styled(SyncIcon)`
    margin-top: 20px;
    position: fixed;
    top: 0;
    right: 20px;
    animation: ${rotate} 2s linear infinite;

    @media (max-width: 1005px) {
        display: none;
    }
`;

export const SavingIdicator = styled(DatabaseIcon)`
    margin-top: 20px;
    position: fixed;
    top: 0;
    right: 20px;
    animation: ${wobble} 2s linear infinite;

    @media (max-width: 1005px) {
        display: none;
    }
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.fourth};
    display: block;
    z-index: 1000;
    padding: 5px 10px 5px 0;
    border-radius: 4px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const Heading = styled.h1`
    padding: 0;
    margin: 0 0 0 -8px;
    font-weight: bold;
    color: #fff;

    &::first-letter {
        background: #000;
        padding: 0 10px 0 7px;
        margin-right: 3px;
    }
`;

export const FilterContainer = styled.div`
    ${Button} {
        margin-top: 5px;
    }
`;
