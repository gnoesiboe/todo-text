import React from 'react';
import useToggleVisibility from '../../hooks/useToggleVisibility';
import { Button, Table } from 'react-bootstrap';
import Octicon, {
    ChevronDownIcon,
    ChevronUpIcon,
} from '@primer/octicons-react';
import './OperationExplanation.css';
import SectionTitle from './components/SectionTitle';
import Section from './components/Section';
import ExplanationOutput from './components/ExplanationOutput';
import ListItem from './components/ListItem';

const OperationExplanation: React.FC = () => {
    const { visible, toggle } = useToggleVisibility(false);

    return (
        <div className="operation-explanation">
            <div className="operation-explanation__button-wrapper text-center">
                <Button onClick={() => toggle()} variant="link" size="sm">
                    {visible ? (
                        <>
                            <Octicon icon={ChevronUpIcon} /> hide operation
                            information
                        </>
                    ) : (
                        <>
                            <Octicon icon={ChevronDownIcon} /> show operation
                            information
                        </>
                    )}
                </Button>
            </div>
            {visible && (
                <div className="operation-explanation__explanation">
                    <Section>
                        <SectionTitle>Keyboard shortcuts</SectionTitle>
                        <Table borderless size="sm">
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>Shortcut</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>down</code>
                                    </td>
                                    <td>
                                        <p>
                                            When a todo is in edit mode, it will
                                            save the current value and continue
                                            to the next (if any).
                                        </p>
                                        <p>
                                            When no item is selected, it will
                                            focus on the first in edit mode.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>up</code>
                                    </td>
                                    <td>
                                        <p>
                                            When a todo is in edit mode, it will
                                            save the current value and move to
                                            the previous todo (if any).
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>alt + up</code>
                                    </td>
                                    <td>
                                        <p>
                                            Moves the currently selected item up
                                            (if possible).
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>alt + down</code>
                                    </td>
                                    <td>
                                        <p>
                                            Moves the currently selected item
                                            down (if possible).
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>enter</code>
                                    </td>
                                    <td>
                                        <p>
                                            When editing a todo, it saves any
                                            changes you have made, and moves to
                                            edit the next one.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>alt + enter</code>
                                    </td>
                                    <td>
                                        <p>
                                            When editing a todo, it saves any
                                            changes you have made. Then it
                                            creates a new todo beneath and
                                            allows you to start editing it.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>alt + shift + enter</code>
                                    </td>
                                    <td>
                                        <p>
                                            When editing a todo, it saves any
                                            changes you have made. Then it
                                            creates a new todo above and allows
                                            you to start editing it.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>crtl + enter</code>
                                    </td>
                                    <td>
                                        <p>
                                            When editing a todo, it saves any
                                            changes you have made and then ends
                                            the edit mode.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Section>
                    <Section>
                        <SectionTitle>Formatting syntax</SectionTitle>
                        <ul className="list-unstyled">
                            <ListItem code="# Some heading">
                                <p>
                                    When put at the front of the todo, the todo
                                    is transformed into a heading. This can used
                                    to create sections within the todo list.
                                </p>
                                <ExplanationOutput>
                                    <span
                                        className="todo-list-item__value__heading"
                                        style={{ marginLeft: 'auto' }}
                                    >
                                        Some heading
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="[fhd]">
                                <p>
                                    When put at the front of the todo, it will
                                    be formatted bold and uppercase as a project
                                    abbrevation, like:
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value__project">
                                        [FHD]
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="**some value**">
                                <p>Will be formatted bold (strong), like:</p>
                                <ExplanationOutput>
                                    <strong>some value</strong>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="[click here](https://www.google.nl)">
                                <p>Wil be formatted as a string, like:</p>
                                <ExplanationOutput>
                                    <a
                                        href="https://www.google.nl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="todo-list-item__value__link"
                                    >
                                        click here
                                    </a>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="@waiting(Michel)">
                                <p>
                                    Words starting with a <code>@</code>-sign
                                    are interpreted as tags and displayed
                                    differently, like:
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value__tag">
                                        @waiting(Michel)
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="@must">
                                <p>
                                    This is a special tag that can be used to
                                    mark the todo as a must have for today. When
                                    applied, the todo's checkbox will receieve
                                    an outstanding border.
                                </p>
                                <p>
                                    Within the todo text itself, it will be
                                    formatted like every other tag:
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value__tag">
                                        @must
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="~~some value~~">
                                <p>
                                    Is displayed as striked through text. Can be
                                    used to display updates or that the task is
                                    no longer executable.
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value--removed">
                                        some value
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="* [ ] some sub-task">
                                <p>
                                    When applied somewhere after the first line,
                                    it will display a todo list item.
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value__sub-item">
                                        some sub-task
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                            <ListItem code="* [x] some sub-task">
                                <p>
                                    When applied somewhere after the first line,
                                    it will display a todo list item.
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value__sub-item todo-list-item__value__sub-item--checked">
                                        some sub-task
                                    </span>
                                </ExplanationOutput>
                            </ListItem>
                        </ul>
                    </Section>
                </div>
            )}
        </div>
    );
};

export default OperationExplanation;
