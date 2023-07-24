import { useAtomValue } from 'jotai';
import { IconButton, Tooltip } from '../Authoring.styles';
import { FiDownload } from 'react-icons/fi';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function Load() {
    const editor = useAtomValue(authoringEditorAtom);
    const onClick = () => {
        if (!editor) return;
        editor.clear();
        editor.loadFromJSON(window.localStorage.getItem('preAu') ?? '');
    };
    return (
        <Tooltip name="LOAD">
            <IconButton className="p-1.5" onClick={onClick}>
                <FiDownload />
            </IconButton>
        </Tooltip>
    );
}
