import EE, { SO } from './events';
import { BasicElement } from './elements';
import { pxToNumber } from './util';

export default class Interaction {
    readonly border = ['bc', 'br', 'rc'];
    area;
    children: { element: HTMLElement; offset: { width: number; height: number } }[] = [];

    constructor() {
        const canvas = document.querySelector<HTMLElement>('.dm-canvas');
        this.area = { width: canvas?.offsetWidth ?? 800, height: canvas?.offsetHeight ?? 500 };
    }

    addSize(element: BasicElement) {
        let currentId = '';
        const client = { x: 0, y: 0 };
        const offset = { width: 0, height: 0 };
        // const type = element.dataset.type ?? '';
        // const isOneWay = [''].includes(type);

        const pointermoveListner = (e: PointerEvent) => {
            const dx = currentId === 'dm-bc' ? 0 : e.clientX - client.x;
            const dy = currentId === 'dm-rc' ? 0 : e.clientY - client.y;
            const dxy = currentId === 'dm-br' && { x: dy * (offset.width / offset.height), y: dy };

            element.style.width = offset.width + (dxy ? dxy.x : dx) + 'px';
            element.style.height = offset.height + (dxy ? dxy.y : dy) + 'px';

            this.children.forEach((child) => {
                child.element.style.width = child.offset.width + (dxy ? dxy.x : dx) + 'px';
                child.element.style.height = child.offset.height + (dxy ? dxy.y : dy) + 'px';
            });

            EE.emit('element:size', [element]);
        };

        const pointerupListner = () => {
            currentId = '';
            this.children = [];
            document.removeEventListener('pointermove', pointermoveListner);
            document.removeEventListener('pointerup', pointerupListner);
            EE.emit('element:size:end', [element]);
            SO.notify();
        };

        const pointerdownListner = (e: PointerEvent, id: string) => {
            if (e.target instanceof Element) currentId = id;
            client.x = e.clientX;
            client.y = e.clientY;
            offset.width = element.offsetWidth;
            offset.height = element.offsetHeight;
            this.children = Array.from(element.querySelectorAll<HTMLElement>('.group, .wrap')).map((element) => ({
                element: element,
                offset: { width: element.offsetWidth, height: element.offsetHeight }
            }));
            document.addEventListener('pointermove', pointermoveListner);
            document.addEventListener('pointerup', pointerupListner);
        };

        const size = this.border.map((id) => {
            const s = document.createElement('div');
            s.classList.add('size', id);
            s.addEventListener('pointerdown', (e) => pointerdownListner(e, `dm-${id}`));
            element.appendChild(s);
            return s;
        });

        return () => size.forEach((s) => s.remove());
    }

    addRotate(element: BasicElement) {
        const r = document.createElement('div');
        r.classList.add('rotate');

        const pointermoveListner = (e: PointerEvent) => {
            const { clientX, clientY } = e;
            const { top, left, width, height } = element.getBoundingClientRect();
            const x = left + width / 2 - clientX;
            const y = top + height / 2 - clientY;
            const deg = (Math.atan2(y, x) * 180) / Math.PI - 90;
            element.style.rotate = `${deg}deg`;

            EE.emit('element:rotate', [element]);
        };
        const pointerupListner = () => {
            document.body.classList.remove('cursor-crosshair');
            document.removeEventListener('pointermove', pointermoveListner);
            document.removeEventListener('pointerup', pointerupListner);
            EE.emit('element:rotate:end', [element]);
            SO.notify();
        };

        const pointerdownListner = () => {
            document.body.classList.add('cursor-crosshair');
            document.addEventListener('pointermove', pointermoveListner);
            document.addEventListener('pointerup', pointerupListner);
        };

        r.addEventListener('pointerdown', pointerdownListner);

        element.appendChild(r);

        return () => r.remove();
    }

    addDrag(element: BasicElement) {
        const client = { x: 0, y: 0 };
        const translate = { x: 0, y: 0 };
        const origin = { x: 0, y: 0 };

        const pointermoveListner = (e: PointerEvent) => {
            const offsetWidth = element.offsetWidth;
            const offsetHeight = element.offsetHeight;
            const dx = e.clientX - client.x;
            const dy = e.clientY - client.y;

            // TODO : rotate값만큼 limit값 조절해줄 필요성이 있음
            const limit = 20;

            translate.x = Math.max(-offsetWidth + limit, Math.min(dx + origin.x, this.area.width - limit));
            translate.y = Math.max(-offsetHeight + limit, Math.min(dy + origin.y, this.area.height - limit));

            element.style.translate = `${translate.x.toFixed(2)}px ${translate.y.toFixed(2)}px`;

            EE.emit('element:drag', [element]);
        };

        const pointerupListner = () => {
            origin.x = translate.x;
            origin.y = translate.y;
            element.classList.remove('cursor-move');
            document.removeEventListener('pointermove', pointermoveListner);
            document.removeEventListener('pointerup', pointerupListner);

            EE.emit('element:drag:end', [element]);
            SO.notify();
        };

        const pointerdownListner = (e: PointerEvent) => {
            e.stopPropagation();
            const isTransform = ['rotate', 'size'].some((c) => (e.target as Element).classList.contains(c));
            if (isTransform || element.__isEditing) return;
            const [translateX = 0, translateY = 0] = pxToNumber(element.style.translate);

            client.x = e.clientX;
            client.y = e.clientY;
            origin.x = translateX;
            origin.y = translateY;
            element.classList.add('cursor-move');
            document.addEventListener('pointermove', pointermoveListner);
            document.addEventListener('pointerup', pointerupListner);
        };

        element.addEventListener('pointerdown', pointerdownListner);

        return () => element.removeEventListener('pointerdown', pointerdownListner);
    }
}
