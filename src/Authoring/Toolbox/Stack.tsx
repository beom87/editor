import { ImUndo } from 'react-icons/im';
import { ImRedo } from 'react-icons/im';
import { IconButton, Tooltip } from '../Authoring.styles';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';

export default function Stack() {
    const editor = useAtomValue(authoringEditorAtom);

    const onStackClick = (type: 'undo' | 'redo') => {
        if (!editor) return;
        editor[type]();
    };

    return (
        <>
            <Tooltip name="UNDO">
                <IconButton className="p-2" onClick={onStackClick.bind(null, 'undo')}>
                    <ImUndo />
                </IconButton>
            </Tooltip>
            <Tooltip name="REDO">
                <IconButton className="p-2" onClick={onStackClick.bind(null, 'redo')}>
                    <ImRedo />
                </IconButton>
            </Tooltip>
        </>
    );
}
