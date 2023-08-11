import { nanoid } from 'nanoid';

export default class DMAnimation extends Animation {
    effect;
    __type;
    __id = nanoid();
    constructor(__element: Element, readonly __keyframes: Keyframe[] | PropertyIndexedKeyframes, readonly __options: KeyframeEffectOptions) {
        const effect = new KeyframeEffect(__element, __keyframes, __options);

        super(effect, document.timeline);
        this.effect = effect;
        this.__type = __options.type;
        // Object.setPrototypeOf(this, Animation.prototype);
    }
    __speed(speed: number) {
        this.playbackRate = speed;
    }
}
