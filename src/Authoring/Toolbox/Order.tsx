import { RiBringForward } from 'react-icons/ri';
import { RiBringToFront } from 'react-icons/ri';
import { RiSendBackward } from 'react-icons/ri';
import { RiSendToBack } from 'react-icons/ri';

import { IconButton, Tooltip } from '../Authoring.styles';
import { useAtomValue, useSetAtom } from 'jotai';
import { authoringEditorAtom, toastAtom } from '../../atoms/atoms';

export default function Order() {
    const editor = useAtomValue(authoringEditorAtom);
    const toast = useSetAtom(toastAtom);

    const onOrderClick = (type: 'bringFoward' | 'bringToFront' | 'sendBackward' | 'sendToBack') => {
        if (!editor) return;
        const elements = editor.getActiveElements();
        if (elements.length === 0) {
            toast({ message: 'SELECT ELEMENT' });
        } else if (elements.length === 1) {
            editor[type](elements[0]);
        } else {
            toast({ message: 'SELECT ONE ELEMENT' });
        }
    };

    return (
        <>
            <Tooltip name="BRING FOWARD">
                <IconButton onClick={onOrderClick.bind(null, 'bringFoward')}>
                    <RiBringForward />
                </IconButton>
            </Tooltip>
            <Tooltip name="BRING TO FRONT">
                <IconButton onClick={onOrderClick.bind(null, 'bringToFront')}>
                    <RiBringToFront />
                </IconButton>
            </Tooltip>
            <Tooltip name="SEND BACKWARD">
                <IconButton onClick={onOrderClick.bind(null, 'sendBackward')}>
                    <RiSendBackward />
                </IconButton>
            </Tooltip>
            <Tooltip name="SEND TO BACK">
                <IconButton onClick={onOrderClick.bind(null, 'sendToBack')}>
                    <RiSendToBack />
                </IconButton>
            </Tooltip>
        </>
    );
}
