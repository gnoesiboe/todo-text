import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './features/todoList/TodoList';
import { TodoContextProvider } from './context/todoContext/TodoContext';
import 'bootstrap/dist/css/bootstrap.css';
import OperationExplanation from './features/operationExplanation/OperationExplanation';
import { AuthenticationContextProvider } from './context/authenticationContext/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
    <div className="app">
        <AuthenticationContextProvider>
            <Container fluid="sm">
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <TodoContextProvider>
                            <TodoList />
                        </TodoContextProvider>
                        <OperationExplanation />
                    </Col>
                </Row>
            </Container>
        </AuthenticationContextProvider>
        <ToastContainer />
    </div>
);

export default App;
