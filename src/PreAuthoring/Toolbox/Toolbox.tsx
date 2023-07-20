import { Vr } from '../PreAuthoring.styles';
import InsertImage from './InsertImage';
import InsertTextbox from './InsertTextbox';
import Load from './Load';
import Preview from './Preview';
import Save from './Save';

export default function Toolbox() {
    return (
        <div className="flex gap-x-1">
            <Save />
            <Load />
            <Preview />
            <InsertImage />
            <InsertTextbox />
            <Vr />
        </div>
    );
}
