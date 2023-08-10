import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../../atoms/atoms';
import { pxToNumber } from '../../../editor/util';
import { useEffect, useState } from 'react';

export default function Size() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [{ width, height }, setSize] = useState({
        width: pxToNumber(activeElement?.offsetWidth.toString() ?? '')[0],
        height: pxToNumber(activeElement?.offsetHeight.toString() ?? '')[0]
    });
    const onChange = (type: 'width' | 'height', e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeElement) return;
        activeElement.style[type] = e.target.value + 'px';
        setSize((prev) => ({ ...prev, [type]: Number(e.target.value) }));
    };
    useEffect(() => {
        if (!activeElement) return;
        if (!activeElement.style.width) activeElement.style.width = activeElement?.offsetWidth + 'px';
        if (!activeElement.style.height) activeElement.style.height = activeElement?.offsetHeight + 'px';

        setSize({
            width: pxToNumber(activeElement?.style.width ?? '')[0],
            height: pxToNumber(activeElement?.style.height ?? '')[0]
        });
    }, [activeElement, activeElement?.style.width, activeElement?.style.height]);

    return (
        <div className="flex mt-1 gap-x-4">
            <div>
                <label className="px-1 w-24 inline-block font-semibold">WIDTH</label>
                <input className="px-1 w-24 border rounded" type="number" min="0" value={width} onChange={onChange.bind(null, 'width')}></input>
            </div>
            <div>
                <label className="px-1 w-24 inline-block font-semibold">HEIGHT</label>
                <input className="px-1 w-24  border rounded" type="number" min="0" value={height} onChange={onChange.bind(null, 'height')}></input>
            </div>
        </div>
    );
}
