import { useAtomValue } from 'jotai';
import { IconButton, Tooltip } from '../Authoring.styles';
import { MdGrid4X4 } from 'react-icons/md';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function Grid() {
    const editor = useAtomValue(authoringEditorAtom);
    const onClick = () => {
        if (!editor) return;
        editor.grid();
    };
    return (
        <Tooltip name="LOAD">
            <IconButton className="p-1.5" onClick={onClick}>
                <MdGrid4X4 />
            </IconButton>
        </Tooltip>
    );
}
