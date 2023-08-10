import Editor, { DMElements } from './core';
import { GroupElement } from './elements';
import { generateId } from './util';

export default class DMKeyboard {
    editor;
    private _clip = '';

    constructor(editor: Editor) {
        this.editor = editor;
    }

    keydownListner = (e: KeyboardEvent) => {
        if (!e) return;
        const { code, metaKey, ctrlKey, shiftKey } = e;
        const mectKey = metaKey || ctrlKey;
        if (code === 'KeyC' && mectKey) this.copy();
        if (code === 'KeyV' && mectKey) this.paste();
        if (code === 'KeyX' && mectKey) this.cut();
        if (code === 'KeyG' && !shiftKey && mectKey) e.preventDefault(), this.toGroup();
        if (code === 'KeyG' && shiftKey && mectKey) this.ungroup();
        if (code === 'KeyZ' && !shiftKey && mectKey) e.preventDefault(), this.editor.undo();
        if (code === 'KeyZ' && shiftKey && mectKey) e.preventDefault(), this.editor.redo();
    };

    copy() {
        const activeElements = this.editor.getActiveElements();
        const elements = this.editor.getElements().filter((element) => !element.__isEditing && activeElements.includes(element));
        const effects = this.editor.getEffects().filter((effect) => elements.includes(effect.element as DMElements));
        const elementData = elements.reduce((p, c) => {
            p.push(c.__toData());
            return p;
        }, [] as IElementData[]);
        const effectsData = effects.reduce((p, c) => {
            p.push(c.toData());
            return p;
        }, [] as IEffectData[]);
        elementData.forEach((data) => {
            const id = generateId();
            const effect = effectsData.find((effect) => effect.id === data.id);
            if (effect) effect.id = id;
            data.id = id;
        });

        const r = { elements: elementData, effects: effectsData };

        this._clip = JSON.stringify(r);
    }
    paste() {
        this.editor.loadFromJSON(this._clip);
    }
    cut() {
        const activeElements = this.editor.getActiveElements();
        this.copy();
        this.editor.remove(activeElements);
    }
    toGroup() {
        const activeElements = this.editor.getActiveElements();
        if (activeElements.length < 2) return;
        const group = this.editor.toGroup(activeElements);
        this.editor.activeElements([group]);
    }
    ungroup() {
        const activeElements = this.editor.getActiveElements();
        if (activeElements.length !== 1) return;
        if (activeElements[0] instanceof GroupElement) {
            const children = this.editor.unGroup(activeElements[0]);
            children && this.editor.activeElements(children);
        }
    }

    active() {
        this.editor.canvas.addEventListener('keydown', this.keydownListner);
    }
    inActive() {
        this.editor.canvas.removeEventListener('keydown', this.keydownListner);
    }
}
