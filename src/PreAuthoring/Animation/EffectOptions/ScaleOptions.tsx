import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useRef, useState } from 'react';
import DMAnimation from '../../editor/dmAnimation';
import { Collapse } from '../../PreAuthoring.styles';
import { scaleToNumber } from '../../editor/util';

type TScaleOptionsProps = { type: string; animation: DMAnimation };

export default function ScaleOptions({ type, animation }: TScaleOptionsProps) {
    const [open, setOpen] = useState(false);
    const origin = useRef(animation.effect.getKeyframes()[0]);
    const onOpenClick = () => setOpen(!open);

    const onScaleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'x' | 'y') => {
        const keyframe = animation.effect.getKeyframes()[0];
        const [x = 1, y = 1] = scaleToNumber(keyframe.scale as string);
        const scale = type === 'x' ? `${e.target.value} ${y}` : `${x} ${e.target.value}`;
        animation.effect.setKeyframes([{ ...keyframe, scale }]);
    };

    return (
        <>
            <button className="p-1 w-full flex items-center gap-x-1 justify-between" onClick={onOpenClick}>
                <span>{type}</span>
                <span className="inline-block w-5 h-5">{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </button>
            <Collapse open={open}>
                <div className="flex gap-x-2 p-1 justify-between">
                    <label>SCALE-X</label>
                    <input
                        className="w-14 border rounded"
                        type="number"
                        defaultValue={parseInt(origin.current.scale?.toString() ?? '1')}
                        onChange={(e) => onScaleChange(e, 'x')}
                    ></input>
                </div>
                <div className="flex gap-x-2 p-1 justify-between">
                    <label>SCALE-Y</label>
                    <input
                        className="w-14 border rounded"
                        type="number"
                        defaultValue={parseInt(origin.current.scale?.toString() ?? '1')}
                        onChange={(e) => onScaleChange(e, 'y')}
                    ></input>
                </div>
            </Collapse>
        </>
    );
}
