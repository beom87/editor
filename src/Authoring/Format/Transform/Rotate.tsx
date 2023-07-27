import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../../atoms/atoms';
import { degToNumber } from '../../../editor/util';
import { useEffect, useState } from 'react';

export default function Rotate() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [[deg = 0], setRotate] = useState(degToNumber(activeElement?.style.rotate ?? ''));
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeElement) return;
        activeElement.style.rotate = `${e.target.value}deg`;
        setRotate([Number(e.target.value)]);
    };

    useEffect(() => {
        if (!activeElement) return;
        setRotate(degToNumber(activeElement?.style.rotate ?? ''));
    }, [activeElement, activeElement?.style.rotate]);

    return (
        <div className="flex mt-1 gap-x-4">
            <div>
                <label className="px-1 w-24 inline-block">degree</label>
                <input className="px-1 w-24 border rounded" type="number" min="0" value={deg} onChange={onChange}></input>
            </div>
        </div>
    );
}
