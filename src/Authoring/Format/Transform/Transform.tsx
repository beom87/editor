import { Collapse } from '../../Authoring.styles';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import Translate from './Translate';
import Size from './Size';
import Rotate from './Rotate';

export default function Transform({ open, onOpenClick }: { open: boolean; onOpenClick: () => void }) {
    return (
        <>
            <button className="px-1 font-bold flex items-center" onClick={onOpenClick}>
                <span className="inline-block w-5 h-5 mr-2">{open ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
                <span className="text-left">TRANSFORM</span>
            </button>
            <Collapse open={open}>
                <Translate />
                <Size />
                <Rotate />
            </Collapse>
        </>
    );
}
