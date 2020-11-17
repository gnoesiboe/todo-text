import { startEditNotes } from './../../../constants/keyDefnitions';
import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { Mode } from './useManageMode';

export default function useStartEditWithKeyboardShortcut(
    startEdit: () => void,
    mode: Mode,
) {
    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (!checkKeyDefinitionIsPressed(startEditNotes, event)) {
                return;
            }

            event.preventDefault();

            startEdit();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [mode, startEdit]);
}
