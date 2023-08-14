interface KeyframeEffectOptions {
    type?: TEffect;
}

// Editor
interface IElementOptions {
    id?: string;
    cssText?: string;
    flipX?: boolean;
    flipY?: boolean;
}

interface IWrapElementOptions extends IElementOptions {}
interface IGroupElementOptions extends IElementOptions {}

interface ITextboxOptions extends IElementOptions {
    text?: string;
}
interface IImageOptions extends IElementOptions {
    src?: string;
}
interface IRectOptions extends IElementOptions {
    attributes?: {
        x?: string;
        y?: string;
        width?: string;
        height?: string;
        fill?: string;
        stroke?: string;
        'stroke-width'?: string;
    };
}
interface ICircleOptions extends IElementOptions {
    attributes?: {
        cx?: string;
        cy?: string;
        rx?: string;
        ry?: string;
        fill?: string;
        stroke?: string;
        'stroke-width'?: string;
    };
}

interface IElementData extends IElementOptions {
    type?: string;
    children?: IElementData[];
}

interface IEffectData {
    id?: string;
    animation?: { keyframes: Keyframe[] | PropertyIndexedKeyframes; options: KeyframeEffectOptions }[];
}

type TDataMap = { textbox: '__textbox'; image: '__image'; rect: '__rect' };

// Event Emitter
// basic
type TBasic = 'element:select' | 'element:add' | 'element:remove' | 'element:group' | 'element:ungroup';
// focus
type TFocus = 'element:active' | 'element:discardActive';
// interaction
type TDrag = 'element:drag' | 'element:drag:end';
type TRotate = 'element:rotate' | 'element:rotate:end';
type TSize = 'element:size' | 'element:size:end';
// effects
type TEffects = 'effects:add' | 'effects:delete';
// stack
type TStack = 'stack';
type TEffect = 'fadeIn' | 'fadeOut' | 'opacity' | 'sound' | 'move' | 'scale' | 'rotate';

type TEvents = TBasic | TFocus | TDrag | TRotate | TSize | TEffects | TStack;
