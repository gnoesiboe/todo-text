import React, { ReactNode } from 'react';
import { Container as BootstrapContainer } from 'react-bootstrap';
import styled from 'styled-components';
import { useTodoContext } from 'context/todoContext/TodoContext';

type Props = {
    children: ReactNode;
};

const Container = styled(BootstrapContainer)`
    min-height: 100vh;
    margin-top: -20px;
    padding: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
        padding: 5px;
    }
`;

const MainContainer: React.FC<Props> = ({ children }) => {
    const { clearCurrentItem } = useTodoContext();

    const onClick = () => clearCurrentItem();

    return (
        <Container onClick={onClick} fluid="lg">
            {children}
        </Container>
    );
};

export default MainContainer;
