import { useAtomValue } from 'jotai';
import { Vr } from '../Authoring.styles';
import Flip from './Flip';
import Group from './Group';
import Insert from './Insert';
import Load from './Load';
import Order from './Order';
import Preview from './Preivew';
import Remove from './Remove';
import Save from './Save';
import Stack from './Stack';
import { activeElementsAtom } from '../../atoms/atoms';
import { useMemo } from 'react';
import TextStyle from './TextStyle';
import Grid from './Grid';
import ShapeStyle from './ShapeStyle';

export default function Toolbox() {
    const activeElements = useAtomValue(activeElementsAtom);

    const isTextbox = useMemo(() => activeElements?.length === 1 && activeElements[0].dataset.type === 'textbox', [activeElements]);
    const isShape = useMemo(() => activeElements?.length === 1 && ['rect', 'circle'].includes(activeElements[0].dataset.type ?? ''), [activeElements]);

    return (
        <div className="flex gap-x-1">
            <Save />
            <Load />
            <Preview />
            <Grid />
            <Vr />
            <Stack />
            <Vr />
            <Insert />
            <Vr />
            <Remove />
            <Vr />
            <Group />
            {isShape && (
                <>
                    <Vr />
                    <ShapeStyle />
                </>
            )}
            {isTextbox && (
                <>
                    <Vr />
                    <TextStyle />
                </>
            )}
            <Vr />
            <Order />
            <Vr />
            <Flip />
        </div>
    );
}
