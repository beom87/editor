import { toastAtom } from '../../atoms/atoms';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { createToastElement, removeToastElement, transitionToast } from './helper';

export default function ToastMessage({ children }: { children: React.ReactNode }) {
    const toast = useAtomValue(toastAtom);

    useEffect(() => {
        if (!toast.message) return;
        const toastEl = createToastElement(toast.message);
        setTimeout(() => transitionToast(), 1);
        setTimeout(() => removeToastElement(toastEl), 3000);
    }, [toast]);

    return <>{children}</>;
}
