import { useState } from 'react';

type TCanvasProps = { canvasRef: React.RefObject<HTMLDivElement> };
export default function Canvas({ canvasRef }: TCanvasProps) {
    const [point, setPoint] = useState({ x: 0, y: 0 });

    const onPointerMove = (e: React.PointerEvent) => {
        const x = e.clientX - (canvasRef.current?.offsetLeft ?? 0);
        const y = e.clientY - (canvasRef.current?.offsetTop ?? 0);
        setPoint({ x, y });
    };
    const onPointerLeave = () => {
        setPoint({ x: 0, y: 0 });
    };

    return (
        <div className='min-w-[480px] min-h-[360px] '>
            <div className="text-center">
                <span>LEFT</span>
                <span> : </span>
                <span>{point.x.toFixed(2)}</span>
                <span className="px-4">|</span>
                <span>TOP</span>
                <span> : </span>
                <span>{point.y.toFixed(2)}</span>
            </div>
            <div ref={canvasRef} className="w-[480px] h-[360px] border rounded" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}></div>
        </div>
    );
}
