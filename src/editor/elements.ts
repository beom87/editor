import EE from './events';
import Interaction from './interaction';
import { applyStyle, flipToNumber, pxToNumber } from './util';

export class BasicElement extends HTMLElement {
    static __name = 'dm-basic';

    __interaction;
    __isEditing = false;

    __removeDrag = () => {};
    __removeRotate = () => {};
    __removeSize = () => {};

    constructor() {
        super();
        this.__interaction = new Interaction();
        this.addEventListener('pointerdown', () => {
            EE.emit('element:select', this);
            EE.emit('element:active', [this]);
        });
    }

    get __flipX() {
        return this.getAttribute('flip-x') === 'true';
    }
    set __flipX(isFlipX: boolean) {
        this.setAttribute('flip-x', String(isFlipX));
        const flipX = flipToNumber(isFlipX);
        const flipY = flipToNumber(this.__flipY);
        this.style.scale = `${flipX} ${flipY}`;
    }
    get __flipY() {
        return this.getAttribute('flip-y') === 'true';
    }
    set __flipY(isFlipY: boolean) {
        this.setAttribute('flip-y', String(isFlipY));
        const flipX = flipToNumber(this.__flipX);
        const flipY = flipToNumber(isFlipY);
        this.style.scale = `${flipX} ${flipY}`;
    }

    // INTERACTION
    __addDrag() {
        this.__removeDrag();
        this.__removeDrag = this.__interaction.addDrag(this);
    }
    __addRotate() {
        this.__removeRotate();
        this.__removeRotate = this.__interaction.addRotate(this);
    }
    __addSize() {
        this.__removeSize();
        this.__removeSize = this.__interaction.addSize(this);
    }
    //
    __toData() {}
}

export class WrapElement extends BasicElement {
    // DIGITAL MATH
    static __name = 'dm-wrap';

    constructor() {
        super();
    }

    // DATA
    __toData() {
        const type = `${this.dataset.type}` as keyof TDataMap;
        const key: TDataMap[typeof type] = `__${type}`;
        const elementData = this[key]?.();

        return { id: this.id, ...elementData, cssText: this.style.cssText, flipX: this.__flipX, flipY: this.__flipY };
    }
    __textbox() {
        const text = this.querySelector('p')?.innerHTML ?? '';
        return { type: 'textbox', text };
    }
    __image() {
        const src = this.querySelector('img')?.src ?? '';
        return { type: 'image', src };
    }
    __rect() {
        const rect = this.querySelector('rect');
        const attributes = rect?.getAttributeNames().reduce((p, c) => ({ ...p, [c]: rect?.getAttribute(c) ?? '' }), {} as { [key: string]: string });
        return { type: 'rect', attributes };
    }
    __addEditable() {
        const paragraph = this.querySelector('p');
        if (this.dataset.type !== 'textbox') return;
        if (!paragraph) return;

        this.addEventListener('dblclick', () => this.__activeEditable());
        paragraph.addEventListener('blur', () => this.__inactiveEditable());
    }

    __activeEditable() {
        const paragraph = this.querySelector('p');
        if (!paragraph) return;
        paragraph.contentEditable = 'plaintext-only';
        paragraph.focus();
        this.__isEditing = true;
        this.setAttribute('editing', 'true');
    }
    __inactiveEditable() {
        const paragraph = this.querySelector('p');
        if (!paragraph) return;
        paragraph.contentEditable = 'inherit';
        this.__isEditing = false;
        this.removeAttribute('editing');
    }
    // STYLE
    __setTextStyle(cssStyle: { [key in keyof CSSStyleDeclaration]?: string }) {
        if (this.dataset.type !== 'textbox') return;
        const paragraph = this.querySelector('p');
        const selection = document.getSelection();
        if (!paragraph || !selection) return;

        const span = applyStyle(document.createElement('span'), cssStyle);
        const range = selection.getRangeAt(0);
        const selectedContent = range.extractContents();

        if (!selectedContent.textContent) {
            applyStyle(this, cssStyle);
            paragraph.querySelectorAll('span').forEach((s) => applyStyle(s, cssStyle, { value: 'inherit' }));
        } else {
            selectedContent.querySelectorAll('span').forEach((s) => applyStyle(s, cssStyle, { value: 'inherit' }));
            span.appendChild(selectedContent);
            range.insertNode(span);
        }

        // REMOVE EMPTY ELEMENT
        paragraph.querySelectorAll('span').forEach((s) => !s.textContent && s.remove());
    }
}

export class GroupElement extends BasicElement {
    static __name = 'dm-group';

    constructor() {
        super();

        const dblclickListner = (e: MouseEvent) => {
            e.stopImmediatePropagation();
            const target = Array.from(this.children).find((child) => child.contains(e.target as BasicElement)) as BasicElement | null;
            if (!target) return;
            if (target instanceof WrapElement) target.__activeEditable();
            target.__addDrag();
            target.__addRotate();
            target.__addSize();
            EE.emit('element:active', [target]);

            const remove = () => {
                if (target instanceof WrapElement) target.__inactiveEditable();
                target.__removeDrag();
                target.__removeRotate();
                target.__removeSize();

                const children = Array.from(this.children).filter((child) => child instanceof BasicElement) as BasicElement[];
                const [ox = 0, oy = 0] = pxToNumber(this.style.translate);
                const bbox = this.__getChildrenBBox(children);

                this.style.translate = `${ox + bbox.x1}px ${oy + bbox.y1}px`;
                this.style.width = `${bbox.x2 - bbox.x1}px`;
                this.style.height = `${bbox.y2 - bbox.y1}px`;

                children.forEach((child) => {
                    const [x = 0, y = 0] = pxToNumber(child.style.translate);
                    child.style.translate = `${x - bbox.x1}px ${y - bbox.y1}px`;
                });

                EE.emit('element:active', [this]);
                EE.off('element:drag:end', remove);
            };

            EE.on('element:drag:end', remove);
        };

        this.addEventListener('dblclick', dblclickListner, { capture: true });
    }

    __add(elements: BasicElement | BasicElement[], options?: { hasStyle?: boolean }) {
        const children = (Array.isArray(elements) ? elements : [elements]).reverse();

        const bbox = this.__getChildrenBBox(children);

        children.forEach((child) => {
            child.__removeDrag();
            child.__removeRotate();
            child.__removeSize();
            this.prepend(child);
        });

        if (!options?.hasStyle) {
            this.style.translate = `${bbox.x1 - 1}px ${bbox.y1 - 1}px`;
            this.style.width = `${bbox.x2 - bbox.x1}px`;
            this.style.height = `${bbox.y2 - bbox.y1}px`;
        }

        children.forEach((child) => {
            const [x = 0, y = 0] = pxToNumber(child.style.translate);
            child.classList.remove('focus');
            child.style.translate = `${x - bbox.x1}px ${y - bbox.y1}px`;
        });
    }

    __ungroup() {
        this.__removeDrag();
        this.__removeRotate();
        this.__removeSize();

        const [dx = 0, dy = 0] = pxToNumber(this.style.translate);
        const children = Array.from(this.children) as (WrapElement | GroupElement)[];

        children.forEach((child) => {
            const [x = 0, y = 0] = pxToNumber(child.style.translate);
            child.__addDrag();
            child.__addRotate();
            child.__addSize();
            child.style.translate = `${x + dx + 1}px ${y + dy + 1}px`;
        });

        return children;
    }

    __toData() {
        const children = Array.from(this.children).reduce((p, child) => {
            if (child instanceof BasicElement) p.push(child.__toData() as unknown as IElementData);
            return p;
        }, [] as IElementData[]);
        return { id: this.id, cssText: this.style.cssText, type: 'group', children };
    }

    private __getChildrenBBox = (children: BasicElement[]) =>
        children.reduce(
            (p, child) => {
                const [x1 = 0, y1 = 0] = pxToNumber(child.style.translate);
                const x2 = x1 + child.offsetWidth;
                const y2 = y1 + child.offsetHeight;
                p.x1 = Math.min(p.x1, x1);
                p.y1 = Math.min(p.y1, y1);
                p.x2 = Math.max(p.x2, x2);
                p.y2 = Math.max(p.y2, y2);

                return p;
            },
            { x1: 9999, y1: 9999, x2: 0, y2: 0 }
        );
}
