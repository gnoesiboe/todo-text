import { Mode } from './useManageMode';
import { Ace } from 'ace-builds';
import { MutableRefObject, useEffect } from 'react';

export default function useAddKeyboardBindings(
    mode: Mode,
    editorRef: MutableRefObject<Ace.Editor | undefined>,
    stopEdit: () => void,
) {
    useEffect(() => {
        if (mode !== Mode.Edit || !editorRef.current) {
            return;
        }

        editorRef.current.commands.addCommand({
            name: 'custom-save',
            bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
            exec: () => stopEdit(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);
}
