import { Ace } from 'ace-builds';
import { MutableRefObject } from 'react';

export default function useFocusEditorOnLoad(
    editorRef: MutableRefObject<Ace.Editor | undefined>,
) {
    const onLoad = (editor: Ace.Editor) => {
        editorRef.current = editor;

        editor.focus();
    };

    return { onLoad };
}
