import { useSetAtom } from 'jotai';
import { authoringEditorAtom } from '../atoms/atoms';
import { useEffect, useRef } from 'react';
import Editor from './editor/core';
import Toolbox from './Toolbox';
import View from './View';
import Animation from './Animation';

export default function PreAuthoring() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const setPreviewEditor = useSetAtom(authoringEditorAtom);

    useEffect(() => {
        if (!canvasRef.current) return;
        const editor = new Editor(canvasRef.current);
        setPreviewEditor(editor);
    }, [setPreviewEditor]);

    return (
        <div className="flex flex-col h-screen">
            <header className="flex p-1 items-center">
                <Toolbox />
            </header>
            <main className="flex">
                <div className="flex-[1] border p-1">
                    <View />
                </div>
                <div ref={canvasRef} className="w-[800px] h-[500px] border rounded"></div>
                <div className="flex-[1.5] border p-1">FORMAT CONTAINER</div>
            </main>
            <footer className="flex-[1] overflow-auto p-1">
                <Animation />
            </footer>
        </div>
    );
}
