import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../atoms/atoms';
import { useEffect, useState } from 'react';
import { TDMElements } from '../editor/core';
import SelectEffect from './SelectEffect';
import Play from './Play';
import EffectOptions from './EffectOptions';

export default function Animation() {
    const editor = useAtomValue(authoringEditorAtom);
    const [elements, setElements] = useState<TDMElements[]>();

    const onEffectChange = (element: TDMElements, effect?: { type: string }) => {
        if (!editor) return;
        const effects = editor.effect(element);

        if (effect?.type === 'move') effects.addMove();
        if (effect?.type === 'scale') effects.addScale();
        if (effect?.type === 'rotate') effects.addRotate();
        if (effect?.type === 'fadeIn') effects.addFadeIn();
        if (effect?.type === 'fadeOut') effects.addFadeOut();
    };

    const onEffectListClick = (element: TDMElements) => {
        // const a = editor?.effect(element);
    };

    useEffect(() => {
        const listner = () => setElements(editor?.getElements());

        editor?.on('element:add', listner);
        editor?.on('element:remove', listner);
        editor?.on('effects:add', listner);
        editor?.on('effects:delete', listner);

        return () => {
            editor?.off('element:add', listner);
            editor?.off('element:remove', listner);
            editor?.off('effects:add', listner);
            editor?.off('effects:delete', listner);
        };
    }, [editor]);

    return (
        <>
            <Play />
            {elements?.map((element, index) => (
                <div key={element.id + index} className="border rounded p-1" onClick={() => onEffectListClick(element)}>
                    <div className="mx-1 text-bold text-lg">
                        <span className="text-red-300 w-40 inline-block">{element.dataset.type?.toUpperCase()}</span>
                        <SelectEffect onChange={(effect) => onEffectChange(element, effect)} />
                    </div>
                    <EffectOptions element={element} />
                </div>
            ))}
        </>
    );
}
