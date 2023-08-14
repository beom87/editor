import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../atoms/atoms';
import { IconButton, ListItem, Tooltip } from '../Authoring.styles';
import { AiOutlineBgColors } from 'react-icons/ai';
import { MdOutlineBorderColor } from 'react-icons/md';
import { BsBorderWidth } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import ColorPicker from '../../components/ColorPicker';

const initialOpenState = { fillColor: false, strokeColor: false, strokeWidth: false };
const strokeWidthList = [
    { strokeWidth: '0', name: 'NONE' },
    { strokeWidth: '1', name: '1px' },
    { strokeWidth: '2', name: '2px' },
    { strokeWidth: '3', name: '3px' },
    { strokeWidth: '4', name: '4px' },
    { strokeWidth: '8', name: '8px' },
    { strokeWidth: '10', name: '10px' }
];

export default function ShapeStyle() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [open, setOpen] = useState(initialOpenState);

    const onOpenClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: keyof typeof open) => {
        e.stopPropagation();
        setOpen((prev) => ({ ...initialOpenState, [type]: !prev[type] }));
    };

    const onAttributeApply = (name: string, value: string) => {
        if (activeElement?.dataset.type === 'rect') {
            const rect = activeElement.querySelector('rect');
            rect?.setAttribute(name, value);
        }
        if (activeElement?.dataset.type === 'circle') {
            const circle = activeElement.querySelector('ellipse');
            circle?.setAttribute(name, value);
        }
    };

    // BLUR HOOK
    useEffect(() => {
        const listner = () => {
            setOpen(initialOpenState);
        };
        document.addEventListener('click', listner);
        return () => {
            document.removeEventListener('click', listner);
        };
    }, []);

    return (
        <>
            <span className="relative">
                <Tooltip className="z-50" name="FILL COLOR">
                    <IconButton onClick={(e) => onOpenClick(e, 'fillColor')}>
                        <AiOutlineBgColors />
                    </IconButton>
                </Tooltip>
                <div className="absolute z-40" onClick={(e) => e.stopPropagation()}>
                    {open.fillColor && <ColorPicker onColorChange={(color) => onAttributeApply('fill', color)} />}
                </div>
            </span>
            <span className="relative">
                <Tooltip className="z-50" name="STROKE COLOR">
                    <IconButton onClick={(e) => onOpenClick(e, 'strokeColor')}>
                        <MdOutlineBorderColor />
                    </IconButton>
                </Tooltip>
                <div className="absolute z-40" onClick={(e) => e.stopPropagation()}>
                    {open.strokeColor && <ColorPicker onColorChange={(color) => onAttributeApply('stroke', color)} />}
                </div>
            </span>
            <span className="relative">
                <Tooltip name="STROKE WIDTH">
                    <IconButton className="p-1.5" onClick={(e) => onOpenClick(e, 'strokeWidth')}>
                        <BsBorderWidth />
                    </IconButton>
                </Tooltip>
                {open.strokeWidth && (
                    <div className="absolute whitespace-pre border rounded p-0.5 bg-white z-10">
                        {strokeWidthList.map((stroke) => (
                            <ListItem key={stroke.strokeWidth} onClick={() => onAttributeApply('stroke-width', stroke.strokeWidth)}>
                                {stroke.name}
                            </ListItem>
                        ))}
                    </div>
                )}
            </span>
        </>
    );
}
