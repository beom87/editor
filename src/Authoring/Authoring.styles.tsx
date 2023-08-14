import classNames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type THTMLProps<T = HTMLDivElement> = React.HTMLAttributes<T>;

export const IconButton = ({ children, className, ...props }: TButtonProps) => (
    <button className={classNames('border rounded p-1 w-8 h-8', className)} {...props}>
        {children}
    </button>
);
export const ListItem = ({ children, className, ...props }: TButtonProps) => (
    <button className={classNames('block hover:shadow p-1 w-full text-left', className)} {...props}>
        {children}
    </button>
);

export const Vr = ({ className, ...props }: THTMLProps) => <div className={classNames('border-r border-gray-300', className)} {...props}></div>;
export const Hr = ({ className, ...props }: THTMLProps) => <div className={classNames('border-t border-gray-300', className)} {...props}></div>;

export const Tooltip = ({
    name,
    children,
    className,
    onPointerEnter: _onPointerEnter,
    onPointerLeave: _onPointerLeave,
    ...props
}: THTMLProps<HTMLSpanElement> & { name: string }) => {
    const container = useRef<HTMLSpanElement>(null);
    const [hover, setHover] = useState(false);
    const position = useRef({ top: '-9999px', left: '-9999px' });
    const onPointerEnter = (e: React.PointerEvent<HTMLSpanElement>) => {
        const domRect = container.current?.getBoundingClientRect();
        position.current = { top: (domRect?.bottom ?? 0) - 10 + 'px', left: (domRect?.right ?? 0) - 10 + 'px' };
        setHover(true);
        _onPointerEnter?.(e);
    };
    const onPointerLeave = (e: React.PointerEvent<HTMLSpanElement>) => {
        setHover(false);
        _onPointerLeave?.(e);
    };
    return (
        <>
            <span ref={container} className={classNames(className)} {...props} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
                {children}
            </span>
            {hover && (
                <span
                    className="fixed text-xs bg-slate-500 text-white border rounded-md p-1 pointer-events-none z-50"
                    style={{ top: position.current.top, left: position.current.left }}
                >
                    {name}
                </span>
            )}
        </>
    );
};

export const Collapse = ({ open, children, className }: THTMLProps & { open: boolean }) => {
    const container = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('');
    const offsetHeight = useRef('');
    useLayoutEffect(() => {
        offsetHeight.current = (container.current?.offsetHeight ?? 0) + 'px';
        setHeight('0');
    }, []);

    useEffect(() => {
        setHeight(open ? offsetHeight.current : '0');
    }, [open]);

    return (
        <div ref={container} className={classNames('transition-all overflow-hidden', className)} style={{ height }}>
            {children}
        </div>
    );
};
