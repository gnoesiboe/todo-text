import React, { useRef } from 'react';
import AceEditor from 'react-ace';
import { Ace } from 'ace-builds';
import { parseMarkdown } from 'utility/markdownUtilities';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-tomorrow';
import useManageMode, { Mode } from './hooks/useManageMode';
import useAddKeyboardBindings from './hooks/useAddKeyboardBindings';
import useFocusEditorOnLoad from './hooks/useFocusEditorOnLoad';
import usePersistNotesOnChange from './hooks/usePersistNotesOnChange';
import useStartEditWithKeyboardShortcut from './hooks/useStartEditWithKeyboardShortcut';
import { EditorContainer, ViewContainer } from './components/Container';
import {
    SavingIndicator,
    FetchingIndicator,
} from 'primitives/connectionIndicator/ConnectionIndicator';
import {
    useIsFetchingNotes,
    useManageNotesState,
} from 'context/notesContext/NotesContext';

const EditNotes: React.FC = () => {
    const editorRef = useRef<Ace.Editor>();

    const { mode, startEdit, stopEdit, onFocus, onBlur } = useManageMode();

    const isFetching = useIsFetchingNotes();

    const { value, updateValue } = useManageNotesState();

    useAddKeyboardBindings(mode, editorRef, stopEdit);

    const { onLoad } = useFocusEditorOnLoad(editorRef);

    const { isSaving } = usePersistNotesOnChange(value, isFetching);

    useStartEditWithKeyboardShortcut(startEdit, mode);

    switch (mode) {
        case Mode.View:
            return (
                <ViewContainer onDoubleClick={() => startEdit()}>
                    {isSaving && <SavingIndicator />}
                    {isFetching && <FetchingIndicator />}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: parseMarkdown(value),
                        }}
                    />
                </ViewContainer>
            );

        case Mode.Edit:
            return (
                <EditorContainer>
                    <AceEditor
                        mode="markdown"
                        onLoad={onLoad}
                        value={value}
                        onChange={updateValue}
                        onFocus={onFocus}
                        theme="tomorrow"
                        name="notes"
                        fontSize={15}
                        height="calc(100vh - 80px)"
                        width="100%"
                        highlightActiveLine={false}
                        onBlur={onBlur}
                        showGutter={false}
                        wrapEnabled
                    />
                </EditorContainer>
            );

        default:
            throw new Error('Should not get to this point');
    }
};

export default EditNotes;
