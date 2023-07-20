import { MdPreview } from 'react-icons/md';
import { IconButton } from '../PreAuthoring.styles';

export default function Preview() {
    return (
        <IconButton>
            <MdPreview className="w-full h-full" />
        </IconButton>
    );
}
