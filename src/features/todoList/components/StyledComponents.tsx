import styled from 'styled-components';
import { Button } from '../../../primitives/FilterButton/components/StyledComponents';

export const Container = styled.div`
    border: 3px solid #264653;
    padding: 30px 40px 40px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 30px;
`;

export const ConnectionIndicator = styled.div`
    margin-top: 20px;
    position: fixed;
    top: 0;
    right: 20px;

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
