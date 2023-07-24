import { AiOutlineCaretDown } from 'react-icons/ai';
import { AiOutlineCaretUp } from 'react-icons/ai';
import { useState } from 'react';
import { effectList } from './const';

type TSelectEffectProps = { onChange?: (effect: (typeof effectList)[number]) => void };
export default function SelectEffect({ onChange: _onChange }: TSelectEffectProps) {
    const [open, setOpen] = useState(false);

    const onOpenClick = () => setOpen(!open);

    const onChange = (effect: (typeof effectList)[number]) => {
        setOpen(!open);
        _onChange?.(effect);
    };

    return (
        <span className="relative">
            <button className="border p-1 mx-1 rounded items-center" onClick={onOpenClick}>
                SELECT EFFECT
                <span className="inline-block w-5 h-5">{open ? <AiOutlineCaretUp className="mt-1" /> : <AiOutlineCaretDown className="mt-1" />}</span>
            </button>
            {open && (
                <ul className="absolute left-1 border rounded p-1 bg-white z-10">
                    {effectList.map((effect) => (
                        <li key={effect.type} className="px-1">
                            <button onClick={onChange.bind(null, effect)}>{effect.type.toUpperCase()}</button>
                        </li>
                    ))}
                </ul>
            )}
        </span>
    );
}
