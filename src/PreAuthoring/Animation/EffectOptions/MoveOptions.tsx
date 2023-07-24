import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useRef, useState } from 'react';
import DMAnimation from '../../editor/dmAnimation';
import { Collapse } from '../../PreAuthoring.styles';
import { pxToNumber } from '../../editor/util';

type TMoveOptions = { type: string; animation: DMAnimation };
export default function MoveOptions({ type, animation }: TMoveOptions) {
    const [open, setOpen] = useState(false);
    const origin = useRef(animation.effect.getKeyframes()[0]);

    const onOpenClick = () => setOpen(!open);

    const onMoveChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'x' | 'y') => {
        const keyframe = animation.effect.getKeyframes()[0];
        const [x = 0, y = 0] = pxToNumber((keyframe.translate as string) ?? '');
        const translate = type === 'x' ? `${e.target.value}px ${y}px` : `${x}px ${e.target.value}px`;
        animation.effect.setKeyframes([{ ...keyframe, translate }]);
    };

    return (
        <>
            <button className="p-1 w-full flex items-center gap-x-1 justify-between" onClick={onOpenClick}>
                <span>{type}</span>
                <span className="inline-block w-5 h-5">{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </button>
            <Collapse open={open}>
                <div className="flex gap-x-2 p-1">
                    <label>MOVE-X</label>
                    <input
                        className="w-20 border rounded"
                        type="number"
                        defaultValue={parseInt(origin.current.translate?.toString() ?? '0')}
                        onChange={(e) => onMoveChange(e, 'x')}
                    ></input>
                </div>
                <div className="flex gap-x-2 p-1">
                    <label>MOVE-Y</label>
                    <input
                        className="w-20 border rounded"
                        type="number"
                        defaultValue={parseInt(origin.current.translate?.toString() ?? '0')}
                        onChange={(e) => onMoveChange(e, 'y')}
                    ></input>
                </div>
            </Collapse>
        </>
    );
}
