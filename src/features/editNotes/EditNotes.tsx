import React, { useRef } from 'react';
import AceEditor from 'react-ace';
import { Ace } from 'ace-builds';
import { EditorContainer, ViewContainer } from './components/StyledComponents';
import { parseMarkdown } from '../../utility/markdownUtilities';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-tomorrow';
import useManageMode, { Mode } from './hooks/useManageMode';
import useManageEditorValue from './hooks/useManageEditorValue';
import useAddKeyboardBindings from './hooks/useAddKeyboardBindings';
import useFocusEditorOnLoad from './hooks/useFocusEditorOnLoad';

const EditNotes: React.FC = () => {
    const editorRef = useRef<Ace.Editor>();

    const { value, onChange } = useManageEditorValue();

    const { mode, startEdit, stopEdit, onFocus, onBlur } = useManageMode();

    useAddKeyboardBindings(mode, editorRef, stopEdit);

    const { onLoad } = useFocusEditorOnLoad(editorRef);

    if (mode === Mode.View) {
        return (
            <ViewContainer
                dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
                onDoubleClick={() => startEdit()}
            />
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
                fontSize={16}
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
