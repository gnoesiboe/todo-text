import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TodoList from './features/todoList/TodoList';
import { TodoContextProvider } from './context/todoContext/TodoContext';
import 'bootstrap/dist/css/bootstrap.css';
import OperationExplanation from './features/operationExplanation/OperationExplanation';
import { AuthenticationContextProvider } from './context/authenticationContext/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components/macro';
import { ThemeContextProvider } from './context/themeContext/ThemeContext';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DeviceInformationContextProvider } from './context/deviceInformationContext/DeviceInformationContext';
import EditNotes from './features/editNotes/EditNotes';
import { ActivityContextProvider } from './context/activityContext/ActivityContext';
import MainContainer from './features/mainContainer/MainContainer';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

const App: React.FC = () => (
    <ThemeContextProvider>
        <AppContainer>
            <DeviceInformationContextProvider>
                <AuthenticationContextProvider>
                    <ActivityContextProvider>
                        <TodoContextProvider>
                            <MainContainer>
                                <Row>
                                    <Col lg={{ span: 7, offset: 0 }}>
                                        <DndProvider options={HTML5toTouch}>
                                            <TodoList />
                                        </DndProvider>
                                        <OperationExplanation />
                                    </Col>
                                    <Col lg={{ span: 5, offset: 0 }}>
                                        <EditNotes />
                                    </Col>
                                </Row>
                            </MainContainer>
                        </TodoContextProvider>
                    </ActivityContextProvider>
                </AuthenticationContextProvider>
                <ToastContainer />
            </DeviceInformationContextProvider>
        </AppContainer>
    </ThemeContextProvider>
);

export default App;
