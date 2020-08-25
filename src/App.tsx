import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './features/todoList/TodoList';
import { TodoContextProvider } from './context/todoContext/TodoContext';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC = () => (
    <div className="app">
        <Container fluid="sm">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <TodoContextProvider>
                        <TodoList />
                    </TodoContextProvider>
                </Col>
            </Row>
        </Container>
    </div>
);

export default App;
