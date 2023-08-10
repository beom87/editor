import { FaRegObjectGroup } from 'react-icons/fa';
import { FaRegObjectUngroup } from 'react-icons/fa';
import { IconButton, Tooltip } from '../Authoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { GroupElement } from '../../editor/elements';

export default function Group() {
    const editor = useAtomValue(authoringEditorAtom);

    const onToGroupClick = () => {
        if (!editor) return;
        const elements = editor.getActiveElements();

        if (elements.length < 2) return;
        const group = editor.toGroup(elements);
        editor.activeElements([group]);
    };

    const onUngroupClick = () => {
        if (!editor) return;
        const elements = editor.getActiveElements();
        if (elements.length !== 1) return;
        if (elements[0] instanceof GroupElement) {
            const children = editor.unGroup(elements[0]);
            children && editor.activeElements(children);
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
