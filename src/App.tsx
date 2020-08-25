import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './features/todoList/TodoList';
import { TodoContextProvider } from './context/todoContext/TodoContext';

const App: React.FC = () => (
    <Container fluid="sm">
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <TodoContextProvider>
                    <TodoList />
                </TodoContextProvider>
            </Col>
        </Row>
    </Container>
);

export default App;
