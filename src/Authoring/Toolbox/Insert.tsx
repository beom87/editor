import { BiImageAdd } from 'react-icons/bi';
import { MdTextFields } from 'react-icons/md';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { IconButton } from '../Authoring.styles';

export default function Insert() {
    const editor = useAtomValue(authoringEditorAtom);
    const onInsertImageClick = () => {
        if (!editor) return;
        const image = editor.image('https://sol-api.esls.io/images/M1/MI00000914.svg?dummy=1689056130845');
        editor?.add(image);
    };

    const onInsertTextClick = () => {
        if (!editor) return;
        const textbox = editor.textbox('TEXT');
        editor.add(textbox);
    };

    return (
        <>
            <IconButton onClick={onInsertImageClick}>
                <BiImageAdd />
            </IconButton>
            <IconButton onClick={onInsertTextClick}>
                <MdTextFields />
            </IconButton>
        </>
    );
}
