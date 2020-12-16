import styled from 'styled-components/macro';
import { containerPaddingRightLeft } from './Container';

const Header = styled.div`
    background: #ddd;
    border-bottom: 1px solid #aaa;
    border-top: 1px solid #aaa;
    position: sticky;
    top: 0;
    display: block;
    z-index: ${({ theme }) => theme.zIndex.todoListHeader};
    padding: 5px 10px 5px 0;
    margin: 20px -${containerPaddingRightLeft * 2}px 20px -${containerPaddingRightLeft *
        2}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        margin-left: -${containerPaddingRightLeft}px;
        margin-right: -${containerPaddingRightLeft}px;
    }
`;

export default Header;
