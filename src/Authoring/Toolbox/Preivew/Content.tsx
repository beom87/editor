import { useEffect } from 'react';
import Renderer from './renderer';

type TContentProps = { onClose: () => void };
export default function Content({ onClose }: TContentProps) {
    const load = async () => {
        const renderer = new Renderer(document.getElementById('dm-canvas') as HTMLDivElement);
        const data = localStorage.getItem('SAMPLE') ?? '';

        renderer.clear();
        await renderer.load(data);
        renderer.initialize();
        renderer.run();
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="fixed inset-0 bg-white z-10">
            <div className="w-[480px] h-screen m-auto flex flex-col justify-center">
                <div className="text-right mb-2">
                    <span>
                        <button className="border rounded p-1 w-16" onClick={onClose}>
                            CLOSE
                        </button>
                    </span>
                </div>
                <header className="flex justify-between items-center">
                    <span className="flex-1">
                        <button id="dm-play" className="border rounded p-1 w-16">
                            PLAY
                        </button>
                    </span>
                    <span>
                        <label className="mx-1">SPEED</label>
                        <select id="dm-speed" className="border-[1px] border-[black] rounded-md p-[4px] cursor-pointer" defaultValue="1">
                            <option value="0.1">더 느리게</option>
                            <option value="0.5">느리게</option>
                            <option value="1">보통</option>
                            <option value="1.5">빠르게</option>
                            <option value="2">더 빠르게</option>
                        </select>
                    </span>
                </header>
                <main className="my-2">
                    <div id="dm-canvas" className="w-[480px] h-[640px] border rounded"></div>
                </main>
                <footer>
                    <input id="dm-progress" className="w-full cursor-pointer" type="range" min="0" max="0" />
                </footer>
            </div>
        </div>
    );
}
