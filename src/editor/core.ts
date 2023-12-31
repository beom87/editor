import EE, { SO } from './events';
import { BasicElement, GroupElement, WrapElement } from './elements';
import Effects from './effets';
import { applyAttributeNS, applyStyle, generateId, isIntersect } from './util';
import './editor.css';
import DMKeyboard from './dmKeyboard';
export type DMElements = WrapElement | GroupElement;

export default class Editor {
    canvas;
    _dmKeyboard;
    private _effects: Record<string, Effects> = {};
    private _activeElement: DMElements[] = [];
    private _stackLoad = false;
    private _grid;

    inactiveFocus = () => {};
    inactiveSelection = () => {};
    inactiveStack = () => {};
    inactiveKeyboard = () => {};

    constructor(element: HTMLElement) {
        this.canvas = element;
        this.canvas.classList.add('dm-canvas');
        this.canvas.tabIndex = 0;
        this._dmKeyboard = new DMKeyboard(this);
        this._grid = this._createGridElement();

        // import('./editor.css');

        // DEFINE CUSTOM Element
        if (!customElements.get(WrapElement.__name)) customElements.define(WrapElement.__name, WrapElement);
        if (!customElements.get(GroupElement.__name)) customElements.define(GroupElement.__name, GroupElement);

        // ACTIVE STATE
        this.inactiveFocus = this.activeFocus();
        this.inactiveSelection = this.activeSelection();
        this.inactiveStack = this.activeStack();
        this.inactiveKeyboard = this.activeKeyboard();
    }

    // ELEMET HANDLER
    add(elements: DMElements | DMElements[]) {
        const _elements = Array.isArray(elements) ? elements : [elements];
        _elements.forEach((element) => this.canvas.appendChild(element));
        EE.emit('element:add');
        SO.notify();
    }
    remove(elements: DMElements | DMElements[]) {
        const _elements = Array.isArray(elements) ? elements : [elements];
        _elements.forEach((element) => element.remove());
        EE.emit('element:remove');
        SO.notify();
    }
    toGroup(elements: DMElements | DMElements[], options?: IGroupElementOptions) {
        const group = this._createGroup(options);
        group.__add(elements, { hasStyle: !!options?.cssText });
        this.add(group);

        if (Array.isArray(elements)) elements.forEach((element) => this._effects[element.id]?.delete());
        else this._effects[elements.id].delete();

        EE.emit('element:group');
        SO.notify();
        return group;
    }
    unGroup(element: GroupElement) {
        if (element.dataset.type !== 'group') return;
        const children = element.__ungroup();
        this.add(children);
        this.remove(element);
        EE.emit('element:ungroup');
        SO.notify();

        return children;
    }

    // ELEMENT CREATOR
    textbox(options?: ITextboxOptions) {
        const wrap = this._createWrap('textbox', options);

        const paragraph = document.createElement('p');
        paragraph.classList.add('element');
        paragraph.innerHTML = options?.text ?? '';

        wrap.prepend(paragraph);
        wrap.__addEditable();
        return wrap;
    }
    image(options?: IImageOptions) {
        const wrap = this._createWrap('image', options);

        const img = document.createElement('img');
        img.classList.add('element');
        img.src = options?.src ?? '';
        img.draggable = false;

        wrap.prepend(img);

        return wrap;
    }
    rect(options?: IRectOptions) {
        const wrap = this._createWrap('rect', options);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        if (!wrap.style.width) wrap.style.width = '100px';
        if (!wrap.style.height) wrap.style.height = '100px';

        applyStyle(svg, { overflow: 'visible' });
        applyAttributeNS(rect, {
            x: '5%',
            y: '5%',
            fill: '#fff',
            stroke: '#000000',
            width: '90%',
            height: '90%',
            ...(options?.attributes ?? {})
        });
        svg.classList.add('element');
        svg.appendChild(rect);

        wrap.prepend(svg);

        return wrap;
    }

    circle(options?: ICircleOptions) {
        const wrap = this._createWrap('circle', options);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        if (!wrap.style.width) wrap.style.width = '100px';
        if (!wrap.style.height) wrap.style.height = '100px';
        applyStyle(svg, { overflow: 'visible' });
        applyAttributeNS(rect, {
            cx: '50%',
            cy: '50%',
            rx: '45%',
            ry: '45%',
            fill: '#fff',
            stroke: '#000000',
            ...(options?.attributes ?? {})
        });
        svg.classList.add('element');
        svg.appendChild(rect);

        wrap.prepend(svg);

        return wrap;
    }

    // EFFECT - ANIMATION
    effect(element: DMElements) {
        if (element.id in this._effects) return this._effects[element.id];
        const effect = new Effects(element);
        this._effects[element.id] = effect;
        return effect;
    }
    play() {
        return this.getEffects().map((effect) => effect.play());
    }
    pause() {
        this.getEffects().forEach((effect) => effect.pause());
    }
    cancel() {
        this.getEffects().forEach((effect) => effect.cancel());
    }
    speed(speed: number) {
        this.getEffects().forEach((effect) => effect.speed(speed));
    }
    updateTime(time: number) {
        this.getEffects().forEach((effect) => effect.updateTime(time));
    }

    // EVENT EMITTER
    on(event: TEvents, listener: (data: any) => void) {
        EE.on(event, listener);
    }
    off(event: TEvents, listner: (data: any) => void) {
        EE.off(event, listner);
    }

    // IMPORT & EXPORT
    toData() {
        const elements = this.getElements().reduce((p, c) => {
            p.push(c.__toData());
            return p;
        }, [] as IElementData[]);

        const effects = this.getEffects().reduce((p, c) => {
            p.push(c.toData());
            return p;
        }, [] as IEffectData[]);

        return { elements, effects };
    }

    loadFromJSON(json?: any) {
        if (!json) return;
        const data = (typeof json !== 'string' ? json : JSON.parse(json)) as { elements: IElementData[]; effects: IEffectData[] };
        const loadElement = (data: IElementData) => {
            let element;
            if (data.type === 'textbox') element = this.textbox(data);
            if (data.type === 'image') element = this.image(data);
            if (data.type === 'rect') element = this.rect(data);
            if (data.type === 'group') element = this.toGroup(data?.children?.map(loadElement) as DMElements | DMElements[], data);
            if (element) this.add(element);
            return element;
        };
        const loadEffect = (data: IEffectData) => {
            if (!data.id) return;
            const target = document.getElementById(data.id) as DMElements;
            if (!target) return;
            const effect = this.effect(target);
            data.animation?.forEach((anim) => effect.add({ keyframes: anim.keyframes, options: anim.options }));
        };

        data?.elements?.forEach(loadElement);
        data?.effects?.forEach(loadEffect);
    }

    // UTIL - CLIENT(USER) SIDE
    getActiveElements() {
        return this._activeElement;
    }
    getElements() {
        return Array.from(this.canvas.children) as DMElements[];
    }
    getEffects() {
        return Object.values(this._effects);
    }
    clear() {
        this.remove(this.getElements());
        this.getEffects().forEach((effect) => effect.delete());
        this._effects = {};
    }
    undo() {
        SO.index -= 1;
        this._stackLoad = true;
        this.clear();
        this.loadFromJSON(SO.stack[SO.index - 1]);
        this._stackLoad = false;
    }
    redo() {
        SO.index += 1;
        this._stackLoad = true;
        this.clear();
        this.loadFromJSON(SO.stack[SO.index - 1]);
        this._stackLoad = false;
    }
    grid() {
        if (this._grid.isConnected) this._grid.remove();
        else this.canvas.prepend(this._grid);
    }
    bringToFront(element: HTMLElement) {
        this.canvas.insertAdjacentElement('beforeend', element);
    }
    bringFoward(element: HTMLElement) {
        if (element.nextSibling) this.canvas.insertBefore(element.nextSibling, element);
    }
    sendToBack(element: HTMLElement) {
        this.canvas.insertAdjacentElement('afterbegin', element);
    }
    sendBackward(element: HTMLElement) {
        if (element.previousSibling) this.canvas.insertBefore(element, element.previousSibling);
    }
    activeElements(elements: DMElements[]) {
        EE.emit('element:active', elements);
    }
    discardActiveElements() {
        EE.emit('element:discardActive');
    }
    activeFocus() {
        this.inactiveFocus();
        const pointerdown = (e: PointerEvent) => e.target === this.canvas && EE.emit('element:discardActive');

        this.canvas.addEventListener('pointerdown', pointerdown);

        EE.on('element:active', (elements: DMElements[]) => {
            this._activeElement = elements;

            const focus = (element: DMElements) => {
                elements.includes(element) ? element.classList.add('focus') : element.classList.remove('focus');
                if (element instanceof GroupElement) (Array.from(element.children) as DMElements[]).forEach(focus);
            };

            this.getElements().forEach(focus);
        });
        EE.on('element:discardActive', () => {
            this._activeElement = [];

            const focusout = (element: DMElements) => {
                element.classList.remove('focus');
                if (element instanceof GroupElement) (Array.from(element.children) as DMElements[]).forEach(focusout);
            };

            this.getElements().forEach(focusout);
        });

        return () => {
            this.canvas.removeEventListener('pointerdown', pointerdown);
        };
    }

    activeSelection() {
        this.inactiveSelection();
        const slelectionClient = { x: 0, y: 0 };
        const selectionElement: HTMLElement = document.createElement('div');

        const pointermoveListner = (e: PointerEvent) => {
            const dx = e.clientX - slelectionClient.x;
            const dy = e.clientY - slelectionClient.y;
            if (dx < 0) selectionElement.style.left = e.clientX + 'px';
            if (dy < 0) selectionElement.style.top = e.clientY + 'px';
            selectionElement.style.width = Math.abs(dx) + 'px';
            selectionElement.style.height = Math.abs(dy) + 'px';
        };
        const pointerupListner = () => {
            const targets = this.getElements().filter((element) => element !== selectionElement && isIntersect(selectionElement, element));

            EE.emit('element:active', targets);
            selectionElement.style.width = '0';
            selectionElement.style.height = '0';
            selectionElement.remove();
            document.removeEventListener('pointermove', pointermoveListner);
            document.removeEventListener('pointerup', pointerupListner);
        };
        const pointerdown = (e: PointerEvent) => {
            if (e.target !== this.canvas) return;
            slelectionClient.x = e.clientX;
            slelectionClient.y = e.clientY;

            selectionElement.style.position = 'fixed';
            selectionElement.style.top = slelectionClient.y + 'px';
            selectionElement.style.left = slelectionClient.x + 'px';
            selectionElement.style.border = '1px solid red';
            this.canvas.appendChild(selectionElement);
            document.addEventListener('pointermove', pointermoveListner);
            document.addEventListener('pointerup', pointerupListner);
        };

        this.canvas.addEventListener('pointerdown', pointerdown);

        return () => {
            selectionElement.remove();
            this.canvas.removeEventListener('pointerdown', pointerdown);
        };
    }
    activeStack() {
        this.inactiveStack();
        const subscribe = () => {
            if (this._stackLoad) return;
            SO.stack = SO.stack.slice(0, SO.index);
            SO.stack.push(this.toData());
            SO.index = SO.stack.length;
        };
        SO.subscribe(subscribe);
        return () => {
            SO.unsubscribe(subscribe);
        };
    }
    activeKeyboard() {
        this.inactiveKeyboard();

        this._dmKeyboard.active();

        return () => this._dmKeyboard.inActive();
    }

    // UTIL - EDITOR SIDE
    private _createDMElement<T extends BasicElement>(name: string, type: string) {
        const dm = document.createElement(name) as T;

        dm.setAttribute('data-type', type);
        dm.__addDrag();
        dm.__addRotate();
        dm.__addSize();

        return dm;
    }
    private _createWrap(type: string, options?: IWrapElementOptions) {
        const wrap = this._createDMElement<WrapElement>(WrapElement.__name, type);

        wrap.classList.add('wrap');
        wrap.id = options?.id ?? generateId();
        wrap.style.cssText = options?.cssText ?? '';
        wrap.__flipX = !!options?.flipX;
        wrap.__flipY = !!options?.flipY;

        return wrap;
    }
    private _createGroup(options?: IGroupElementOptions) {
        const group = this._createDMElement<GroupElement>(GroupElement.__name, 'group');

        group.classList.add('group');
        group.id = options?.id ?? generateId();
        group.style.cssText = options?.cssText ?? '';
        group.__flipX = !!options?.flipX;
        group.__flipY = !!options?.flipY;

        return group;
    }
    private _createGridElement() {
        const grid = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        grid.classList.add('dm-grid');
        applyAttributeNS(grid, { viewBox: `0 0 ${this.canvas.offsetWidth} ${this.canvas.offsetHeight}`, width: '100%', height: '100%' });

        const [row, col] = [this.canvas.offsetHeight / 10, this.canvas.offsetWidth / 10];

        for (let icol = 0; icol < col + 1; icol++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const x = (icol * 10).toString();
            applyAttributeNS(line, { stroke: 'grey', 'stroke-width': icol % 10 === 0 && icol !== 0 ? '1' : '0.5', x1: x, y1: '0', x2: x, y2: '100%' });
            grid.appendChild(line);
        }
        for (let irow = 0; irow < row + 1; irow++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const y = (irow * 10).toString();
            applyAttributeNS(line, { stroke: 'grey', 'stroke-width': irow % 10 === 0 && irow !== 0 ? '1' : '0.5', x1: '0', y1: y, x2: '100%', y2: y });
            grid.appendChild(line);
        }
        return grid;
    }
}
