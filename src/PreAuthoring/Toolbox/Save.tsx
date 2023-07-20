import { FaSave } from 'react-icons/fa';
import { IconButton } from '../PreAuthoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function Save() {
    const editor = useAtomValue(authoringEditorAtom);

    const onClick = () => {
        if (!editor) return;
        const data = editor.toData();
        window.localStorage.setItem('preAu', JSON.stringify(data));
    };
    return (
        <IconButton className="p-1.5" onClick={onClick}>
            <FaSave className="w-full h-full" />
        </IconButton>
    );
}
