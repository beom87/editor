import { BiImageAdd, BiRectangle, BiCircle } from 'react-icons/bi';
import { MdTextFields } from 'react-icons/md';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { IconButton, Tooltip } from '../Authoring.styles';

export default function Insert() {
    const editor = useAtomValue(authoringEditorAtom);
    //IMAGE
    const onInsertImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (!editor) return;
            const image = editor.image({ src: fileReader.result as string });
            editor.add(image);
        };
    };

    // TEXT
    const onInsertTextClick = () => {
        if (!editor) return;
        const textbox = editor.textbox({ text: 'TEXT' });
        editor.add(textbox);
    };
    // RECT
    const onInsertRectClick = () => {
        if (!editor) return;
        const rect = editor.rect();
        editor.add(rect);
    };
    //CIRCLE
    const onInsertCircleClick = () => {
        if (!editor) return;
        const circle = editor.circle();
        editor.add(circle);
    };

    return (
        <>
            <Tooltip name="INSERT TEXT">
                <IconButton onClick={onInsertTextClick}>
                    <MdTextFields />
                </IconButton>
            </Tooltip>
            <Tooltip name="INSERT IMAGE">
                <IconButton>
                    <label htmlFor="upload_image">
                        <BiImageAdd />
                    </label>
                    <input type="file" id="upload_image" accept="image/*" hidden onChange={onInsertImageChange}></input>
                </IconButton>
            </Tooltip>
            <Tooltip name="INSERT RECT">
                <IconButton onClick={onInsertRectClick}>
                    <BiRectangle />
                </IconButton>
            </Tooltip>
            <Tooltip name="INSERT CIRCLE">
                <IconButton onClick={onInsertCircleClick}>
                    <BiCircle />
                </IconButton>
            </Tooltip>
        </>
    );
}
