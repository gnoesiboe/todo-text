import React from 'react';
import useToggleVisibility from '../../hooks/useToggleVisibility';
import { Button, Table } from 'react-bootstrap';
import Octicon, {
    ChevronDownIcon,
    ChevronUpIcon,
} from '@primer/octicons-react';
import ListItem from './components/ListItem';
import {
    ButtonWrapper,
    ExplanationContainer,
    ExplanationSection,
    ExplanationSectionTitle,
    ExplanationOutput,
} from './components/StyledComponents';

const OperationExplanation: React.FC = () => {
    const { visible, toggle } = useToggleVisibility(false);

    return (
        <div>
            <ButtonWrapper>
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
            </ButtonWrapper>
            {visible && (
                <ExplanationContainer>
                    <ExplanationSection>
                        <ExplanationSectionTitle>
                            Keyboard shortcuts
                        </ExplanationSectionTitle>
                        <Table borderless size="sm">
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>Shortcut</th>
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
                                            When an item is selected, the cursor
                                            will move to the next item. When no
                                            item is selected, it will focus on
                                            the first item in the list.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>up</code>
                                    </td>
                                    <td>
                                        <p>
                                            When an item is selected, the cursor
                                            will move to the previous item. When
                                            no item is selected, it will focus
                                            on the last item in the list.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>e</code>
                                    </td>
                                    <td>
                                        <p>
                                            When an item is selected, this
                                            shortcut will put the current item
                                            in edit mode.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>a</code>
                                    </td>
                                    <td>
                                        <p>
                                            When not in edit mode, and an item
                                            is selected, this shortcut will
                                            start a new todo list item behind
                                            the currently selected one.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>shift + a</code>
                                    </td>
                                    <td>
                                        <p>
                                            When not in edit mode, and an item
                                            is selected, this shortcut will
                                            start a new todo list item before
                                            the currently selected one.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>esc</code>
                                    </td>
                                    <td>
                                        <p>
                                            When an item is selected, this
                                            shortcut will deselect the item.
                                            When in edit mode, the edit mode is
                                            exited without saving the changes.
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
                                            the list (if possible).
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
                                            down the list (if possible).
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>ctrl + enter</code>
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
                                        <code>ctrl + enter</code>
                                    </td>
                                    <td>
                                        <p>
                                            When editing a todo, it saves any
                                            changes you have made and ends the
                                            edit mode.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>ctrl + space</code>
                                    </td>
                                    <td>
                                        <p>
                                            When editing a todo, it toggles the
                                            done status of the todo you are
                                            editing.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>alt + backspace</code>
                                    </td>
                                    <td>
                                        <p>
                                            When a todo is selected, this
                                            shortcut can be used to delete it.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </ExplanationSection>
                    <ExplanationSection>
                        <ExplanationSectionTitle>
                            Formatting syntax
                        </ExplanationSectionTitle>
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
                            <ListItem code="@quickfix">
                                <p>
                                    This is a special tag that can be used to
                                    tag the todo as a quick fix. When applied,
                                    the todo's will be marked so it can be
                                    visually scanned quickly.
                                </p>
                                <p>
                                    Within the todo text itself, it will be
                                    formatted like every other tag:
                                </p>
                                <ExplanationOutput>
                                    <span className="todo-list-item__value__tag">
                                        @quickfix
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
                                    <span className="todo-list-item__value__removed">
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
                            <ListItem code="`someCode();`">
                                <p>
                                    When wrapped in `-s, a code block will be
                                    displayed.
                                </p>
                                <ExplanationOutput>
                                    <code className="todo-list-item__value__code">
                                        someCode();
                                    </code>
                                </ExplanationOutput>
                            </ListItem>
                        </ul>
                    </ExplanationSection>
                </ExplanationContainer>
            )}
        </div>
    );
};

export default OperationExplanation;
