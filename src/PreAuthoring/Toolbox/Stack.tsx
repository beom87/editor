import { ImUndo } from 'react-icons/im';
import { ImRedo } from 'react-icons/im';
import { IconButton } from '../PreAuthoring.styles';
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
            <IconButton className="p-2" onClick={onStackClick.bind(null, 'undo')}>
                <ImUndo />
            </IconButton>
            <IconButton className="p-2" onClick={onStackClick.bind(null, 'redo')}>
                <ImRedo />
            </IconButton>
        </>
    );
}
