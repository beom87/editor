import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { useRef, useState } from 'react';
import { IconButton } from '../Authoring.styles';

export default function Play() {
    const editor = useAtomValue(authoringEditorAtom);
    const [value, setValue] = useState('0');
    const progress = useRef<ReturnType<typeof requestAnimationFrame>>(0);
    const timeline = useRef('0');

    const onPlayClick = async () => {
        if (!editor) return;
        if (value !== '0') {
            setValue('0');
            editor.cancel();
            cancelAnimationFrame(progress.current);
            return;
        }
        const startTime = Date.now();
        const update = () => {
            setValue((Date.now() - startTime).toString());
            progress.current = requestAnimationFrame(update);
        };
        progress.current = requestAnimationFrame(update);
        editor.updateTime(Math.round(Number(timeline.current)));
        await Promise.all(editor.play());
        editor.cancel();

        cancelAnimationFrame(progress.current);
        setValue('0');
    };

    const onTimelineChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        timeline.current = e.target.value;
        if (!editor) return;
        editor.updateTime(Math.round(Number(timeline.current)));
    };

    return (
        <div className="flex gap-x-4 my-1 items-center">
            <button className="w-[160px] border rounded p-1" onClick={onPlayClick}>
                {value === '0' ? 'PLAY' : 'STOP'}
            </button>
            <div className="flex-[1]">
                <div>
                    <input className="w-full" type="range" min="0" max="10000" value={value} disabled onChange={() => {}}></input>
                </div>
                <div>
                    <input className="w-full" type="range" min="0" max="10000" defaultValue={'0'} disabled={value !== '0'} onChange={onTimelineChange}></input>
                </div>
            </div>
            <div className="pr-1">
                <IconButton className="bg-black pointer-events-none" />
            </div>
        </div>
    );
}
