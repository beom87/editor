import classes from './style.module.css';
import { useEffect, useRef, useState } from 'react';

type TMultiRange = {
    min?: number | string;
    max?: number | string;
    value?: number[];
    onChange?: (min: number, max: number) => void;
};

export default function MultiRange({ min = 0, max = 1000, value: _value, onChange: _onChange }: TMultiRange) {
    const normalize = useRef({ min: 0, max: Number(max) - Number(min) }).current;
    const [value, setValue] = useState({ thumb1: _value?.[0] ?? normalize.min, thumb2: _value?.[1] ?? normalize.max });
    const [hover, setHover] = useState({ on: false, isDown: false });
    const originValue = useRef({ clientX: 0, ...value });
    const container = useRef<HTMLDivElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setValue({ ...value, [name]: Number(e.target.value) });
    };
    const onPointermove = (e: PointerEvent) => {
        const dx = ((e.clientX - originValue.current.clientX) / (container.current?.offsetWidth || 0)) * normalize.max;
        const thumb1 = Math.round(Math.min(Math.max(originValue.current.thumb1 + dx, normalize.min), normalize.max));
        const thumb2 = Math.round(Math.min(Math.max(originValue.current.thumb2 + dx, normalize.min), normalize.max));
        setValue({ thumb1, thumb2 });
    };

    const onPointerup = () => {
        document.removeEventListener('pointermove', onPointermove);
        document.removeEventListener('pointerup', onPointerup);
        setHover((prev) => ({ ...prev, isDown: false }));
    };

    const onPointerdown = (e: React.PointerEvent<HTMLDivElement>) => {
        originValue.current = { clientX: e.clientX, ...value };
        document.addEventListener('pointermove', onPointermove);
        document.addEventListener('pointerup', onPointerup);
        setHover((prev) => ({ ...prev, isDown: true }));
    };

    const onPointerEnter = () => {
        setHover((prev) => ({ ...prev, on: true }));
    };

    const onPointerLeave = () => {
        setHover((prev) => ({ ...prev, on: false }));
    };

    // ONCHANGE HOOK
    useEffect(() => {
        const [_min, _max] = Object.values(value)
            .sort((a, b) => a - b)
            .map((v) => v + Number(min));
        _onChange?.(_min, _max);
    }, [value, _onChange, min]);

    return (
        <div className="px-1 w-full border rounded">
            <div ref={container} className={`relative w-full h-5 ${classes.container}`} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
                <div
                    className="absolute top-0 bottom-0 py-2 cursor-pointer overflow-hidden"
                    style={{
                        left: (Math.min(value.thumb1, value.thumb2) / normalize.max) * 100 + '%',
                        right: ((normalize.max - Math.max(value.thumb1, value.thumb2)) / normalize.max) * 100 + '%'
                    }}
                    onPointerDown={onPointerdown}
                >
                    <div className="bg-black w-full h-1 -translate-y-[0.25px] rounded-full"></div>
                </div>
                {(hover.on || hover.isDown) && (
                    <div
                        className="absolute inset-0 flex justify-between z-10 pointer-events-none"
                        style={{
                            left: (Math.min(value.thumb1, value.thumb2) / normalize.max) * 100 + '%',
                            right: ((normalize.max - Math.max(value.thumb1, value.thumb2)) / normalize.max) * 100 + '%'
                        }}
                    >
                        <div className="-translate-y-6 border rounded-full">{Math.min(value.thumb1, value.thumb2)}</div>
                        {value.thumb1 !== value.thumb2 && <div className="-translate-y-6 border rounded-full">{Math.max(value.thumb1, value.thumb2)}</div>}
                    </div>
                )}
                <input
                    className="absolute w-full h-full rounded-lg appearance-none cursor-pointer pointer-events-none bg-transparent"
                    name="thumb1"
                    type="range"
                    min={normalize.min}
                    max={normalize.max}
                    value={value.thumb1}
                    onChange={(e) => onChange(e, 'thumb1')}
                ></input>
                <input
                    className="absolute w-full h-full rounded-lg appearance-none cursor-pointer pointer-events-none bg-transparent"
                    name="thumb2"
                    type="range"
                    min={normalize.min}
                    max={normalize.max}
                    value={value.thumb2}
                    onChange={(e) => onChange(e, 'thumb2')}
                ></input>
            </div>
        </div>
    );
}
