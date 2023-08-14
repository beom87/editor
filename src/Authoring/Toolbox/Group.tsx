import { FaRegObjectGroup } from 'react-icons/fa';
import { FaRegObjectUngroup } from 'react-icons/fa';
import { IconButton, Tooltip } from '../Authoring.styles';
import { useAtomValue, useSetAtom } from 'jotai';
import { authoringEditorAtom, toastAtom } from '../../atoms/atoms';
import { GroupElement } from '../../editor/elements';

export default function Group() {
    const editor = useAtomValue(authoringEditorAtom);
    const toast = useSetAtom(toastAtom);

    const onToGroupClick = () => {
        if (!editor) return;
        const elements = editor.getActiveElements();

        if (elements.length < 2) {
            toast({ message: 'SELECT TWO ELEMENTS OR MORE' });
            return;
        }
        const group = editor.toGroup(elements);
        editor.activeElements([group]);
    };

    const onUngroupClick = () => {
        if (!editor) return;
        const elements = editor.getActiveElements();
        if (elements.length !== 1) {
            toast({ message: 'SELECT ONE ELEMENT' });
            return;
        }
        if (elements[0] instanceof GroupElement) {
            const children = editor.unGroup(elements[0]);
            children && editor.activeElements(children);
        } else {
            toast({ message: 'SELECT GROUP ELEMENT' });
        }
    };

    return (
        <>
            <Tooltip name="TO GROUP">
                <IconButton className="p-1" onClick={onToGroupClick}>
                    <FaRegObjectGroup />
                </IconButton>
            </Tooltip>
            <Tooltip name="UNGROUP">
                <IconButton className="p-1" onClick={onUngroupClick}>
                    <FaRegObjectUngroup />
                </IconButton>
            </Tooltip>
        </>
    );
}
