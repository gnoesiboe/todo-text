import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './features/todoList/TodoList';
import { TodoContextProvider } from './context/todoContext/TodoContext';
import 'bootstrap/dist/css/bootstrap.css';
import OperationExplanation from './features/operationExplanation/OperationExplanation';
import { AuthenticationContextProvider } from './context/authenticationContext/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

const App: React.FC = () => (
    <AppContainer>
        <AuthenticationContextProvider>
            <Container fluid="lg">
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        <TodoContextProvider>
                            <TodoList />
                        </TodoContextProvider>
                        <OperationExplanation />
                    </Col>
                </Row>
            </Container>
        </AuthenticationContextProvider>
        <ToastContainer />
    </AppContainer>
);

export default App;
