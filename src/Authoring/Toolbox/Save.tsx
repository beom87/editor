import { FaSave } from 'react-icons/fa';
import { IconButton, Tooltip } from '../Authoring.styles';
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
        <Tooltip name="SAVE">
            <IconButton className="p-1.5" onClick={onClick}>
                <FaSave />
            </IconButton>
        </Tooltip>
    );
}
