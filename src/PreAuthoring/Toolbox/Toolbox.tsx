import { Vr } from '../PreAuthoring.styles';
import Group from './Group';
import Insert from './Insert';
import Load from './Load';
import Order from './Order';
import Preview from './Preview';
import Remove from './Remove';
import Save from './Save';
import Stack from './Stack';

export default function Toolbox() {
    return (
        <div className="flex gap-x-1">
            <Save />
            <Load />
            <Preview />
            <Vr />
            <Stack />
            <Vr />
            <Insert />
            <Vr />
            <Remove />
            <Vr />
            <Group />
            <Vr />
            <Order />
        </div>
    );
}
