import { useSetAtom } from 'jotai';
import { activeElementsAtom, authoringEditorAtom } from '../atoms/atoms';
import { useEffect, useRef } from 'react';
import Editor from '../editor/core';
import Toolbox from './Toolbox';
import View from './View';
import Animation from './Animation';
import { IconContext } from 'react-icons';
import ToastMessage from '../components/ToastMessage/ToastMessage';
import Format from './Format/Format';

export default function Authoring() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const setPreviewEditor = useSetAtom(authoringEditorAtom);
    const setActiveElements = useSetAtom(activeElementsAtom);

    useEffect(() => {
        if (!canvasRef.current) return;
        const editor = new Editor(canvasRef.current);
        setPreviewEditor(editor);
        const activeElemetnsListner = (elements: HTMLElement[]) => setActiveElements(elements);

        editor.on('element:active', activeElemetnsListner);
        editor.on('element:drag:end', activeElemetnsListner);
        editor.on('element:rotate:end', activeElemetnsListner);
        editor.on('element:size:end', activeElemetnsListner);

        return () => {
            editor.off('element:active', activeElemetnsListner);
            editor.off('element:drag:end', activeElemetnsListner);
            editor.off('element:rotate:end', activeElemetnsListner);
            editor.off('element:size:end', activeElemetnsListner);
        };
    }, [setPreviewEditor, setActiveElements]);

    return (
        <IconContext.Provider value={{ className: 'w-full h-full text-gray-800' }}>
            <ToastMessage>
                <div className="flex flex-col h-screen">
                    <header className="flex p-1 items-center">
                        <Toolbox />
                    </header>
                    <main className="flex">
                        <div className="flex-[1] border p-1">
                            <View />
                        </div>
                        <div ref={canvasRef} className="w-[800px] h-[500px] min-w-[800px] min-h-[500px] border rounded"></div>
                        <div className="flex-[1.5] border p-1">
                            <Format />
                        </div>
                    </main>
                    <footer className="flex-[1] overflow-auto p-1">
                        <Animation />
                    </footer>
                </div>
            </ToastMessage>
        </IconContext.Provider>
    );
}
