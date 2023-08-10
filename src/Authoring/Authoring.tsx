import { useSetAtom } from 'jotai';
import { activeElementsAtom, authoringEditorAtom } from '../atoms/atoms';
import { useEffect, useRef } from 'react';
import Editor, { DMElements } from '../editor/core';
import Toolbox from './Toolbox';
import Animation from './Animation';
import { IconContext } from 'react-icons';
import ToastMessage from '../components/ToastMessage/ToastMessage';
import Format from './Format';
import Canvas from './Canvas';
import { Hr, Vr } from './Authoring.styles';

export default function Authoring() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const setPreviewEditor = useSetAtom(authoringEditorAtom);
    const setActiveElements = useSetAtom(activeElementsAtom);

    useEffect(() => {
        if (!canvasRef.current) return;
        const editor = new Editor(canvasRef.current);
        setPreviewEditor(editor);
        const activeElemetnsListner = (elements: DMElements[]) => setActiveElements(elements);

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
                    <Hr />
                    <main className="flex flex-1 gap-x-1 px-1">
                        <Canvas canvasRef={canvasRef} />
                        <Vr />
                        <Format />
                        <Vr />
                        <Animation />
                    </main>
                </div>
            </ToastMessage>
        </IconContext.Provider>
    );
}
