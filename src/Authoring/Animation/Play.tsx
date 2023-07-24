import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { useRef } from 'react';

export default function Play() {
    const editor = useAtomValue(authoringEditorAtom);
    const timeline = useRef('');
    const onPlayClick = async () => {
        if (!editor) return;
        await editor.play();
    };

    const onTimelineChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        timeline.current = e.target.value;
        if (!editor) return;
        editor.updateTime(Math.round(Number(e.target.value)));
    };
    return (
        <div className="flex gap-x-4 my-1">
            <button className="w-[160px] border rounded p-1" onClick={onPlayClick}>
                PLAY
            </button>
            <input className="flex-[1]" type="range" min="0" max="10000" defaultValue={'0'} onChange={onTimelineChange}></input>
        </div>
    );
}
