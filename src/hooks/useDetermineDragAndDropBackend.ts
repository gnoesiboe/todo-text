import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import useIsTouchDevice from './useIsTouchDevice';

export default function useDetermineDragAndDropBackend() {
    const isTouchDevice = useIsTouchDevice(false);

    return isTouchDevice ? TouchBackend : HTML5Backend;
}
