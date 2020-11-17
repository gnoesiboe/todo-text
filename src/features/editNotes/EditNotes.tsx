import React, { useRef } from 'react';
import AceEditor from 'react-ace';
import { Ace } from 'ace-builds';
import {
    EditorContainer,
    SavingIdicator,
    FetchingIndicator,
    ViewContainer,
} from './components/StyledComponents';
import { parseMarkdown } from '../../utility/markdownUtilities';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-tomorrow';
import useManageMode, { Mode } from './hooks/useManageMode';
import useManageEditorValue from './hooks/useManageEditorValue';
import useAddKeyboardBindings from './hooks/useAddKeyboardBindings';
import useFocusEditorOnLoad from './hooks/useFocusEditorOnLoad';
import usePersistNotesOnChange from './hooks/usePersistNotesOnChange';
import useStartEditWithKeyboardShortcut from './hooks/useStartEditWithKeyboardShortcut';

const EditNotes: React.FC = () => {
    const editorRef = useRef<Ace.Editor>();

    const { mode, startEdit, stopEdit, onFocus, onBlur } = useManageMode();

    const { value, onChange, isFetching } = useManageEditorValue(mode);

    useAddKeyboardBindings(mode, editorRef, stopEdit);

    const { onLoad } = useFocusEditorOnLoad(editorRef);

    const { isSaving } = usePersistNotesOnChange(value, isFetching);

    useStartEditWithKeyboardShortcut(startEdit, mode);

    if (mode === Mode.View) {
        return (
            <ViewContainer onDoubleClick={() => startEdit()}>
                {isSaving && <SavingIdicator />}
                {isFetching && <FetchingIndicator />}
                <div
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
                />
            </ViewContainer>
        );
    }

    return (
        <EditorContainer>
            <AceEditor
                mode="markdown"
                onLoad={onLoad}
                value={value}
                onChange={onChange}
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
};

export default EditNotes;
