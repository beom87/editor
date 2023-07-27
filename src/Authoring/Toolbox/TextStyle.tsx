import { MdOutlineFormatBold } from 'react-icons/md';
import { BiFontColor } from 'react-icons/bi';
import { RiFontSize2 } from 'react-icons/ri';
import { IconButton, Tooltip } from '../Authoring.styles';
import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../atoms/atoms';
import { WrapElement } from '../../editor/elements';
import { useEffect, useRef, useState } from 'react';

const initialOpenState = { weight: false, color: false, size: false };
const initialStyle = { color: '#ff0000', fontSize: '16' };
const fontWeightList = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

export default function TextStyle() {
    const activeElement = useAtomValue(activeElementsAtom)?.[0];
    const [open, setOpen] = useState(initialOpenState);
    const [style, setStyle] = useState({ color: '#ff0000', fontSize: '16' });
    const range = useRef<Range>();

    const onOpenClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: keyof typeof initialOpenState) => {
        e.stopPropagation();
        setOpen((prev) => ({ ...initialOpenState, [type]: !prev[type] }));
    };

    const onStyleChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof initialStyle) => {
        const isPX = ['fontSize'].includes(type);
        const suffix = isPX ? 'px' : '';
        setStyle((prev) => ({ ...prev, [type]: e.target.value + suffix }));
    };

    const onStyleApply = (type: 'fontWeight' | 'color' | 'fontSize', value?: string) => {
        if (!activeElement || activeElement.dataset.type !== 'textbox' || !(activeElement instanceof WrapElement)) return;
        if (type === 'fontWeight') activeElement.__setTextStyle({ [type]: value });
        else activeElement.__setTextStyle({ [type]: style?.[type] });
    };

    useEffect(() => {
        const listner = () => {
            setOpen(initialOpenState);
        };
        document.addEventListener('click', listner);
        return () => {
            document.removeEventListener('click', listner);
        };
    }, []);

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
                        {fontWeightList.map((weight) => (
                            <button
                                key={weight}
                                className="block hover:shadow p-1 w-full text-left"
                                style={{ fontWeight: weight }}
                                onClick={() => onStyleApply('fontWeight', weight)}
                            >
                                FONT WEIGHT
                            </button>
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
                    <div className="absolute z-10 border rounded p-0.5 bg-white flex items-center gap-x-2">
                        <input type="color" value={style.color} onChange={(e) => onStyleChange(e, 'color')} onClick={(e) => e.stopPropagation()}></input>
                        <button type="submit" className="border rounded p-0.5" onClick={() => onStyleApply('color')}>
                            APPLY
                        </button>
                    </div>
                )}
            </span>
            <span className="flex gap-x-1">
                <Tooltip name="SIZE">
                    <IconButton className="p-1.5" onClick={() => onStyleApply('fontSize')}>
                        <RiFontSize2 />
                    </IconButton>
                </Tooltip>
                <input
                    className="w-12 border rounded"
                    type="number"
                    min="0"
                    defaultValue={'0'}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onStyleChange(e, 'fontSize')}
                ></input>
            </span>
        </>
    );
}
