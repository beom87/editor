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
        elements.length !== 0 && editor.toGroup(elements);
    };

    const onUngroupClick = () => {
        if (!editor) return;
        const elements = editor.getActiveElements();

        elements.forEach((element) => {
            if (element instanceof GroupElement) editor.unGroup(element);
        });
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
