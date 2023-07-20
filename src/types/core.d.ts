type TKeyframes = { [key in keyof CSSStyleDeclaration]?: string };

type TInsert = {
    element: HTMLElement;
    keyframes: { from?: TKeyframes; to?: TKeyframes };
    animation: { duration: string; delay?: string; repeat?: string; mode?: 'foward' | 'backward' | 'both'; easing?: string };
};
