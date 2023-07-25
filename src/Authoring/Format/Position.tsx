import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../atoms/atoms';
import { pxToNumber } from '../../editor/util';

export default function Position() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [x = 0, y = 0] = pxToNumber(activeElement?.style.translate ?? '');
    // console.log(x, y);

    const onChange = (type: 'x' | 'y') => {
        if (!activeElement) return;
        // console.log(activeElement);
    };

    return (
        <>
            <div>
                <span className="px-1">TRANSLATE</span>
                <div>
                    <label className="px-1">X</label>
                    <input className="px-1 w-20 border rounded" type="number" min="0" value={x} onChange={onChange.bind(null, 'x')}></input>
                </div>
                <div>
                    <label className="px-1">Y</label>
                    <input className="px-1 w-20  border rounded" type="number" min="0" value={y} onChange={onChange.bind(null, 'y')}></input>
                </div>
            </div>
        </>
    );
}
