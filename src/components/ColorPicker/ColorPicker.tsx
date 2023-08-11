import React, { useRef, useState } from 'react';

type TColorPickerProps = { onColorChange?: (hex: string) => void };

export default function ColorPicker({ onColorChange }: TColorPickerProps) {
    const [colors, setColors] = useState(JSON.parse(window.localStorage.getItem('color') ?? '[]') as string[]);
    const addColor = useRef('#000000');

    const onAddColorClick = () => {
        const addedColors = Array.from(new Set([...colors, addColor.current])).slice(-21);
        window.localStorage.setItem('color', JSON.stringify(addedColors));
        setColors(addedColors);
    };
    const onAddColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        addColor.current = e.target.value;
    };

    return (
        <div className="border rounded pt-1 px-1 bg-white" style={{ width: `${24 * 7 + 12}px` }}>
            <div className="mb-1 px-1 flex items-center justify-between gap-x-1">
                <button className="px-1 py-1 border rounded text-sm font-semibold" onClick={onAddColorClick}>
                    ADD COLOR
                </button>
                <input className="mx-1" type="color" onChange={onAddColorChange}></input>
            </div>
            <div className="border-t border-gray-300"></div>
            <div className="mt-1">
                {colors.map((color) => (
                    <button
                        key={color}
                        className="w-5 h-5 mx-0.5 border rounded-full"
                        style={{ backgroundColor: color }}
                        onClick={() => onColorChange?.(color)}
                    ></button>
                ))}
            </div>
        </div>
    );
}
