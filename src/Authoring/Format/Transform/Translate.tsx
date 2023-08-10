import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../../atoms/atoms';
import { pxToNumber } from '../../../editor/util';
import { useEffect, useState } from 'react';

export default function Translate() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [[x = 0, y = 0], setTranslate] = useState(pxToNumber(activeElement?.style.translate ?? ''));
    const onChange = (type: 'x' | 'y', e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeElement) return;
        const mx = type === 'x' ? Number(e.target.value) : x;
        const my = type === 'y' ? Number(e.target.value) : y;
        activeElement.style.translate = `${mx}px ${my}px`;
        setTranslate([mx, my]);
    };

    useEffect(() => {
        if (!activeElement) return;
        setTranslate(pxToNumber(activeElement.style.translate ?? ''));
    }, [activeElement, activeElement?.style.translate]);

    return (
        <div className="flex mt-1 gap-x-4">
            <div>
                <label className="px-1 w-24 inline-block font-semibold">LEFT</label>
                <input className="px-1 w-24 border rounded" type="number" min="0" value={x} onChange={onChange.bind(null, 'x')}></input>
            </div>
            <div>
                <label className="px-1 w-24 inline-block font-semibold">TOP</label>
                <input className="px-1 w-24 border rounded" type="number" min="0" value={y} onChange={onChange.bind(null, 'y')}></input>
            </div>
        </div>
    );
}
