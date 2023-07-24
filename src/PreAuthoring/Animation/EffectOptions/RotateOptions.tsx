import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useRef, useState } from 'react';
import DMAnimation from '../../editor/dmAnimation';
import { Collapse } from '../../PreAuthoring.styles';

type TRotateOptionsProps = { type: string; animation: DMAnimation };

export default function RotateOptions({ type, animation }: TRotateOptionsProps) {
    const [open, setOpen] = useState(false);
    const origin = useRef(animation.effect.getKeyframes()[0]);
    const onOpenClick = () => setOpen(!open);

    const onRotateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        animation.effect.setKeyframes([{ ...origin.current, rotate: e.target.value + 'deg' }]);
    };

    return (
        <>
            <button className="p-1 w-full flex items-center gap-x-1 justify-between" onClick={onOpenClick}>
                <span>{type}</span>
                <span className="inline-block w-5 h-5">{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </button>
            <Collapse open={open}>
                <div className="flex gap-x-2 p-1">
                    <label>DEGREE</label>
                    <input
                        className="w-20 border rounded"
                        type="number"
                        defaultValue={parseInt(origin.current.rotate?.toString() ?? '0')}
                        onChange={onRotateChange}
                    ></input>
                </div>
            </Collapse>
        </>
    );
}
