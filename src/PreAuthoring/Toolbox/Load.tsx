import { useAtomValue } from 'jotai';
import { IconButton } from '../PreAuthoring.styles';
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
        <IconButton className="p-1.5" onClick={onClick}>
            <FiDownload className="w-full h-full" />
        </IconButton>
    );
}
