import { useAtomValue } from 'jotai';
import { Vr } from '../Authoring.styles';
import Flip from './Flip';
import Group from './Group';
import Insert from './Insert';
import Load from './Load';
import Order from './Order';
import Preview from './Preview';
import Remove from './Remove';
import Save from './Save';
import Stack from './Stack';
import { activeElementsAtom } from '../../atoms/atoms';
import { useMemo } from 'react';
import TextStyle from './TextStyle';
import Grid from './Grid';

export default function Toolbox() {
    const activeElements = useAtomValue(activeElementsAtom);

    const isTextbox = useMemo(() => activeElements?.length === 1 && activeElements[0].dataset.type === 'textbox', [activeElements]);

    return (
        <div className="flex gap-x-1">
            <Save />
            <Load />
            <Grid />
            <Vr />
            <Stack />
            <Vr />
            <Insert />
            <Vr />
            <Remove />
            <Vr />
            <Group />
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
