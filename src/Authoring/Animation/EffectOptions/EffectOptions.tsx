import { BsTrash } from 'react-icons/bs';
import { useAtomValue } from 'jotai';
import { authoringEditorAtom } from '../../../atoms/atoms';
import { DMElements } from '../../../editor/core';
import MultiRange from '../../../components/MultiRange/MultiRange';
import DMAnimation from '../../../editor/dmAnimation';
import { IconButton } from '../../Authoring.styles';
import RotateOptions from './RotateOptions';
import MoveOptions from './MoveOptions';
import ScaleOptions from './ScaleOptions';
import FadeOptions from './FadeOptions';

export default function EffectOptions({ element }: { element: DMElements }) {
    const editor = useAtomValue(authoringEditorAtom);
    const effects = editor?.effect(element).getAnimations();

    const onTilmelineChange = (animation: DMAnimation, { min, max }: { min: number; max: number }) => {
        const delay = min;
        const duration = max - min;
        animation.effect.updateTiming({ delay, duration });
    };

    const onRemoveClick = (animation: DMAnimation) => {
        const effects = editor?.effect(element);
        if (!effects) return;
        effects.delete(animation);
    };

    return effects?.map((animation) => {
        const timing = animation.effect.getComputedTiming();
        const value = [timing.delay || 0, (timing.delay || 0) + Number(timing.duration)].map((v) => Math.round(v));
        const type = animation.__type?.toUpperCase() ?? '';

        return (
            <div key={animation.__id} className="flex flex-wrap">
                <div className="w-[160px] max-w-[160px]">
                    {animation.__type === 'rotate' && <RotateOptions type={type} animation={animation} />}
                    {animation.__type === 'move' && <MoveOptions type={type} animation={animation} />}
                    {animation.__type === 'scale' && <ScaleOptions type={type} animation={animation} />}
                    {animation.__type === 'fadeIn' && <FadeOptions type={type} />}
                    {animation.__type === 'fadeOut' && <FadeOptions type={type} />}
                </div>
                <div className="flex-[1] px-2 min-w-[300px] flex gap-x-1 select-none">
                    <div className="flex-1 pt-1.5">
                        <MultiRange min={0} max={15000} value={value} onChange={(min, max) => onTilmelineChange(animation, { min, max })} />
                    </div>
                    <IconButton onClick={onRemoveClick.bind(null, animation)}>
                        <BsTrash />
                    </IconButton>
                </div>
            </div>
        );
    });
}
