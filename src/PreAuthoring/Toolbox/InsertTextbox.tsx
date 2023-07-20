import { MdTextFields } from 'react-icons/md';
import { IconButton } from '../PreAuthoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function InsertTextbox() {
    const editor = useAtomValue(authoringEditorAtom);
    const onClick = () => {
        if (!editor) return;
        const textbox = editor.textbox('TEXT');
        editor.add(textbox);
    };
    return (
        <IconButton onClick={onClick}>
            <MdTextFields className="w-full h-full" />
        </IconButton>
    );
}
