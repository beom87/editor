import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../atoms/atoms';
import { useState } from 'react';
import Transform from './Transform';
// import TextStyle from './TextStyle';

export default function Format() {
    const activeElement = useAtomValue(activeElementsAtom);
    const [open, setOpen] = useState({ transform: false, arrtibute: false });

    const onOpenClick = (type: keyof typeof open) => {
        setOpen({ ...open, [type]: !open[type] });
    };

    if (activeElement?.length === 0)
        return <div className="text-center font-bold w-full h-full flex items-center justify-center min-w-[420px]">SELECT ELEMENT</div>;
    if (activeElement?.length !== 1)
        return <div className="text-center font-bold w-full h-full flex items-center justify-center min-w-[420px]">SELECT ONE ELEMENT</div>;

    return (
        <>
            <div className="border rounded py-1 min-w-[420px]">
                <Transform open={open.transform} onOpenClick={() => onOpenClick('transform')} />
            </div>
            {/* <div className="border rounded py-1 min-w-[400px] mt-1"> */}
            {/* <TextStyle open={open.textStyle} onOpenClick={() => onOpenClick('textStyle')} /> */}
            {/* </div> */}
        </>
    );
}
