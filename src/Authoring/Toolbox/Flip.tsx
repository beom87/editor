import { TbFlipVertical, TbFlipHorizontal } from 'react-icons/tb';
import { IconButton, Tooltip } from '../Authoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function Flip() {
    const editor = useAtomValue(authoringEditorAtom);

    const onFlipClick = (type: 'x' | 'y') => {
        if (!editor) return;
        const elements = editor.getActiveElements();
        elements.forEach((element) => {
            if (type === 'x') element.__flipX = !element.__flipX;
            if (type === 'y') element.__flipY = !element.__flipY;
        });
    };

    return (
        <>
            <Tooltip name="FLIP-x">
                <IconButton className="p-1" onClick={onFlipClick.bind(null, 'x')}>
                    <TbFlipVertical />
                </IconButton>
            </Tooltip>
            <Tooltip name="FLIP-Y">
                <IconButton className="p-1" onClick={onFlipClick.bind(null, 'y')}>
                    <TbFlipHorizontal />
                </IconButton>
            </Tooltip>
        </>
    );
}
