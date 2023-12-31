import { useAtomValue } from 'jotai';
import { activeElementsAtom, authoringEditorAtom } from '../../atoms/atoms';
import { useEffect, useState } from 'react';
import { DMElements } from '../../editor/core';
import SelectEffect from './SelectEffect';
import Play from './Play';
import EffectOptions from './EffectOptions';
import classNames from 'classnames';

export default function Animation() {
    const editor = useAtomValue(authoringEditorAtom);
    const activeElements = useAtomValue(activeElementsAtom);
    const [elements, setElements] = useState<DMElements[]>();

    const onEffectChange = (element: DMElements, effect?: { type: string }) => {
        if (!editor) return;
        const effects = editor.effect(element);

        if (effect?.type === 'move') effects.addMove();
        if (effect?.type === 'scale') effects.addScale();
        if (effect?.type === 'rotate') effects.addRotate();
        if (effect?.type === 'fadeIn') effects.addFadeIn();
        if (effect?.type === 'fadeOut') effects.addFadeOut();
    };

    const onEffectListClick = (element: DMElements) => {
        editor?.activeElements([element]);
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
        <div className="flex-1">
            <Play />
            {elements?.map((element, index) => (
                <div
                    key={element.id + index}
                    className={classNames('border rounded p-1 mb-1', activeElements?.includes(element) && 'shadow-md shadow-gray-400')}
                    onPointerDown={() => onEffectListClick(element)}
                >
                    <div className="mx-1 text-bold text-lg flex items-center">
                        <span className="text-red-300 flex-1">{element.dataset.type?.toUpperCase()}</span>
                        <SelectEffect onChange={(effect) => onEffectChange(element, effect)} />
                    </div>
                    <EffectOptions element={element} />
                </div>
            ))}
        </div>
    );
}
