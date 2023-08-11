import { MdPreview } from 'react-icons/md';
import { IconButton, Tooltip } from '../../Authoring.styles';
import { useState } from 'react';
import Content from './Content';

export default function Preview() {
    const [open, setOpen] = useState(false);

    const onPreivewClick = () => setOpen(true);

    const onCloseClick = () => setOpen(false);

    return (
        <>
            <Tooltip name="PREVIEW">
                <IconButton onClick={onPreivewClick}>
                    <MdPreview />
                </IconButton>
            </Tooltip>
            {open && <Content onClose={onCloseClick} />}
        </>
    );
}
