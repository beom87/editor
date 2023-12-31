import { MdOutlineFormatBold } from 'react-icons/md';
import { BiFontColor } from 'react-icons/bi';
import { RiFontSize2 } from 'react-icons/ri';
import { IconButton, ListItem, Tooltip } from '../Authoring.styles';
import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../atoms/atoms';
import { WrapElement } from '../../editor/elements';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

const initialOpenState = { weight: false, color: false, size: false };
const fontWeightList = [
    { weight: '100', name: 'THIN' },
    { weight: '200', name: 'EXTRA THIN' },
    { weight: '300', name: 'LIGHT' },
    { weight: '400', name: 'NORMAL' },
    { weight: '500', name: 'MEDIUM' },
    { weight: '600', name: 'SEMI BOLD' },
    { weight: '700', name: 'BOLD' },
    { weight: '800', name: 'EXTRA BOLD' },
    { weight: '900', name: 'BLACK' }
];
const fontSizeList = [
    { size: '12px', name: 'TEXT-XS' },
    { size: '14px', name: 'TEXT-SM' },
    { size: '16px', name: 'TEXT-BASE' },
    { size: '18px', name: 'TEXT-LG' },
    { size: '20px', name: 'TEXT-XL' },
    { size: '24px', name: 'TEXT-2XL' },
    { size: '30px', name: 'TEXT-3XL' },
    { size: '36px', name: 'TEXT-4XL' },
    { size: '48px', name: 'TEXT-5XL' },
    { size: '60px', name: 'TEXT-6XL' }
];

export default function TextStyle() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [open, setOpen] = useState(initialOpenState);
    const range = useRef<Range>();

    const onOpenClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: keyof typeof initialOpenState) => {
        e.stopPropagation();
        setOpen((prev) => ({ ...initialOpenState, [type]: !prev[type] }));
    };

    const onStyleApply = (type: 'fontWeight' | 'color' | 'fontSize', value: string) => {
        if (!activeElement || activeElement.dataset.type !== 'textbox' || !(activeElement instanceof WrapElement)) return;
        activeElement.__setTextStyle({ [type]: value });
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

    // TESTING.....
    useEffect(() => {
        const pointerupListner = () => {
            const selection = document.getSelection();
            range.current = selection?.getRangeAt(0);
        };
        activeElement?.addEventListener('pointerup', pointerupListner);
        return () => {
            activeElement?.removeEventListener('pointerup', pointerupListner);
        };
    }, [activeElement]);

    return (
        <>
            <span className="relative">
                <Tooltip name="WEIGHT">
                    <IconButton className="p-1" onClick={(e) => onOpenClick(e, 'weight')}>
                        <MdOutlineFormatBold />
                    </IconButton>
                </Tooltip>
                {open.weight && (
                    <div className="absolute whitespace-pre border rounded p-0.5 bg-white z-10">
                        {fontWeightList.map((font) => (
                            <ListItem key={font.weight} style={{ fontWeight: font.weight }} onClick={() => onStyleApply('fontWeight', font.weight)}>
                                {font.name}
                            </ListItem>
                        ))}
                    </div>
                )}
            </span>
            <span className="relative">
                <Tooltip name="COLOR">
                    <IconButton className="" onClick={(e) => onOpenClick(e, 'color')}>
                        <BiFontColor />
                    </IconButton>
                </Tooltip>
                {open.color && (
                    <div className="absolute" onClick={(e) => e.stopPropagation()}>
                        <ColorPicker onColorChange={(color) => onStyleApply('color', color)} />
                    </div>
                )}
            </span>
            <span className="relative">
                <Tooltip name="SIZE">
                    <IconButton className="p-1.5" onClick={(e) => onOpenClick(e, 'size')}>
                        <RiFontSize2 />
                    </IconButton>
                </Tooltip>
                {open.size && (
                    <div className="absolute whitespace-pre border rounded p-0.5 bg-white z-10">
                        {fontSizeList.map((font) => (
                            <ListItem key={font.size} style={{ fontWeight: font.size }} onClick={() => onStyleApply('fontSize', font.size)}>
                                {font.name}
                            </ListItem>
                        ))}
                    </div>
                )}
            </span>
        </>
    );
}
