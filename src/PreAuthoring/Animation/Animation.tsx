import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { useEffect, useRef, useState } from 'react';
import { pxToNumber } from '../editor/util';
import { TDMElements } from '../editor/core';

export default function Animation() {
    const editor = useAtomValue(authoringEditorAtom);
    const [elements, setElements] = useState<TDMElements[]>();

    const timeline = useRef('');

    const onPlayClick = async () => {
        if (!editor) return;
        await editor.play();
    };

    const onTimelineChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        timeline.current = e.target.value;
        if (!editor) return;
        editor.updateTime(Number(e.target.value));
    };

    const onEffectListClick = (element: TDMElements) => {
        console.log(element);
        const a = editor?.effect(element);
        console.log(a?.getAnimations());
    };

    useEffect(() => {
        const listner = () => setElements(editor?.getElements());

        editor?.on('element:add', listner);
        editor?.on('element:remove', listner);

        return () => {
            editor?.off('element:add', listner);
            editor?.off('element:remove', listner);
        };
    }, [editor]);

    return (
        <>
            <div className="flex gap-x-4 my-1">
                <button className="border rounded p-1" onClick={onPlayClick}>
                    PLAY
                </button>
                <input className="flex-[1]" type="range" min="0" max="60000" onChange={onTimelineChange}></input>
            </div>
            {elements?.map((element, index) => (
                <div key={element.id + index} className="border rounded p-1" onClick={() => onEffectListClick(element)}>
                    <div className="mx-1 text-bold text-lg">
                        <span className="text-red-300 w-28 inline-block">{element.dataset.type?.toUpperCase()}</span>
                        <button className="border p-1 mx-1 rounded">ADD EFFECT</button>
                    </div>
                </div>
            ))}
        </>
    );
}
