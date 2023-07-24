import { MdPreview } from 'react-icons/md';
import { IconButton, Tooltip } from '../PreAuthoring.styles';

export default function Preview() {
    return (
        <Tooltip name="PREVIEW">
            <IconButton>
                <MdPreview />
            </IconButton>
        </Tooltip>
    );
}
