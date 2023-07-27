import DMAnimation from './dmAnimation';
import { DMElements } from './core';
import EE from './events';

export default class Effects {
    id;
    element;

    private _animations = new Set<DMAnimation>();
    private _keyframeDefaultOption: KeyframeEffectOptions = { easing: 'linear', fill: 'forwards' };

    constructor(element: DMElements) {
        this.element = element;
        this.id = element.id ?? '';
    }

    add({ keyframes, options }: { keyframes: Keyframe[] | PropertyIndexedKeyframes; options?: KeyframeEffectOptions }) {
        const animation = new DMAnimation(this.element, keyframes, { ...this._keyframeDefaultOption, ...options });
        this._animations.add(animation);
        animation.persist();
        EE.emit('effects:add');

        return animation;
    }
    delete(animation?: DMAnimation) {
        if (animation) {
            this._animations.delete(animation);
            animation.cancel();
        } else {
            this.cancel();
            this._animations.clear();
        }

        EE.emit('effects:delete');
    }
    getAnimations() {
        return Array.from(this._animations);
    }
    updateTime(time: number) {
        const animations = this.getAnimations();
        animations.forEach((anim) => {
            const endTime = (anim.effect?.getComputedTiming().endTime ?? 0) as number;
            anim.currentTime = Math.min(time, endTime);
            anim.pause();
        });
    }
    toData() {
        const animation = this.getAnimations().reduce((p, anim) => {
            p.push({ keyframes: anim.effect.getKeyframes(), options: { type: anim.__type, ...anim.effect.getComputedTiming() } });
            return p;
        }, [] as { keyframes: Keyframe[] | PropertyIndexedKeyframes; options: KeyframeEffectOptions }[]);

        return { id: this.id, animation };
    }
    play() {
        return Promise.all(
            this.getAnimations().map(async (anim) => {
                const timing = anim.effect.getComputedTiming();
                if ((anim.currentTime ?? 0) >= (timing.endTime ?? 0)) return;
                anim.play();
                return anim.finished;
            })
        );
    }
    pause() {
        this._animations.forEach((anim) => anim.pause());
    }
    cancel() {
        this._animations.forEach((anim) => anim.cancel());
    }
    finish() {
        this._animations.forEach((anim) => anim.finish());
    }
    speed(speed: number) {
        this._animations.forEach((anim) => anim.__speed(speed));
    }
    reverse() {
        this._animations.forEach((anim) => anim.reverse());
    }
    addMove() {
        const keyframes = [{ translate: '0px 0px' }];
        const options: KeyframeEffectOptions = { type: 'move', duration: 1000, delay: 0 };
        const animation = new DMAnimation(this.element, keyframes, { ...this._keyframeDefaultOption, ...options });
        this._animations.add(animation);
        EE.emit('effects:add');
        return animation;
    }
    addFadeIn() {
        const keyframes = [{ opacity: '0' }, { opacity: '1' }];
        const options: KeyframeEffectOptions = { type: 'fadeIn', duration: 1000, delay: 0 };
        const animation = new DMAnimation(this.element, keyframes, { ...this._keyframeDefaultOption, ...options });
        this._animations.add(animation);
        EE.emit('effects:add');
        return animation;
    }
    addFadeOut() {
        const keyframes = [{ opacity: '1' }, { opacity: '0' }];
        const options: KeyframeEffectOptions = { type: 'fadeOut', duration: 1000, delay: 0 };
        const animation = new DMAnimation(this.element, keyframes, { ...this._keyframeDefaultOption, ...options });
        this._animations.add(animation);
        EE.emit('effects:add');
        return animation;
    }
    addRotate() {
        const keyframes = [{ rotate: '90deg' }];
        const options: KeyframeEffectOptions = { type: 'rotate', duration: 1000, delay: 0 };
        const animation = new DMAnimation(this.element, keyframes, { ...this._keyframeDefaultOption, ...options });
        this._animations.add(animation);
        EE.emit('effects:add');
        return animation;
    }
    addScale() {
        const keyframes = [{ scale: '1 1' }];
        const options: KeyframeEffectOptions = { type: 'scale', duration: 1000, delay: 0 };
        const animation = new DMAnimation(this.element, keyframes, { ...this._keyframeDefaultOption, ...options });
        this._animations.add(animation);
        EE.emit('effects:add');
        return animation;
    }
}
