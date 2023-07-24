import { RiDeleteBin6Line } from 'react-icons/ri';
import { IconButton } from '../PreAuthoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function Remove() {
    const editor = useAtomValue(authoringEditorAtom);

    const onClick = () => {
        if (!editor) return;
        const elements = editor.getActiveElements();
        editor.remove(elements);
    };
    return (
        <IconButton className="p-1" onClick={onClick}>
            <RiDeleteBin6Line />
        </IconButton>
    );
}
