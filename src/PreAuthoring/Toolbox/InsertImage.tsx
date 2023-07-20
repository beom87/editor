import { BiImageAdd } from 'react-icons/bi';
import { IconButton } from '../PreAuthoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function InsertImage() {
    const editor = useAtomValue(authoringEditorAtom);
    const onClick = () => {
        if (!editor) return;
        const image = editor.image('https://sol-api.esls.io/images/M1/MI00000914.svg?dummy=1689056130845');
        editor?.add(image);
    };

    return (
        <>
            <IconButton onClick={onClick}>
                <BiImageAdd className="w-full h-full" />
            </IconButton>
        </>
    );
}
