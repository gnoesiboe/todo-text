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
    float: right;
    color: #aaa;
    margin-top: 20px;
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.fourth};
    display: block;
    z-index: 1000;
    padding: 5px 10px;
    border-radius: 4px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Heading = styled.h1`
    padding: 0;
    margin: 0;
    flex: 1;
    color: #fff;
`;

export const FilterContainer = styled.div`
    flex: 2;
    text-align: right;

    ${Button} {
        margin-top: 5px;
    }
`;
