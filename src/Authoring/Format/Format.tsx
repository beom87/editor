import { useAtomValue } from 'jotai';
import { activeElementsAtom } from '../../atoms/atoms';
import Position from './Position';

export default function Format() {
    const activeElement = useAtomValue(activeElementsAtom);
    if (activeElement?.length === 0) return <div>SELECT ELEMENT</div>;
    if (activeElement?.length !== 1) return <div>SELECT ONE ELEMENT</div>;

    return (
        <>
            <Position />
        </>
    );
}
