import { BiImageAdd } from 'react-icons/bi';
import { MdTextFields } from 'react-icons/md';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { IconButton, Tooltip } from '../Authoring.styles';

export default function Insert() {
    const editor = useAtomValue(authoringEditorAtom);

    const onInserImageClick = () => {
        if (!editor) return;
        const image = editor.image('https://sol-api.esls.io/images/M1/MI00000914.svg?dummy=1689056130845');
        editor?.add(image);
    };

    const onInsertImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (!editor) return;
            const image = editor.image(fileReader.result as string);
            editor?.add(image);
        };
    };

    const onInsertTextClick = () => {
        if (!editor) return;
        const textbox = editor.textbox('TEXT');
        editor.add(textbox);
    };

    return (
        <>
            <Tooltip name="TEXT">
                <IconButton onClick={onInsertTextClick}>
                    <MdTextFields />
                </IconButton>
            </Tooltip>
            <Tooltip name="IMAGE">
                <IconButton onClick={onInserImageClick}>
                    <label htmlFor="upload_image" className="pointer-events-none">
                        <BiImageAdd />
                    </label>
                    <input type="file" id="upload_image" accept="image/*" hidden onChange={onInsertImageChange}></input>
                </IconButton>
            </Tooltip>
        </>
    );
}
