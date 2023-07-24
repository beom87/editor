import { nanoid } from 'nanoid';

const GlobalAnimation = window.Animation;

export default class DMAnimation extends GlobalAnimation {
    effect;
    __type;
    __id = nanoid();
    constructor(__element: Element, readonly __keyframes: Keyframe[] | PropertyIndexedKeyframes, readonly __options: KeyframeEffectOptions) {
        const effect = new KeyframeEffect(__element, __keyframes, __options);
        super(effect, document.timeline);
        Object.setPrototypeOf(this, Animation.prototype);
        this.effect = effect;
        this.__type = __options.type;
    }
    __speed(speed: number) {
        this.playbackRate = speed;
    }
}
