import { PropsWithChildren } from 'react';
import classNames from 'classnames';

type TButtonPropsWithChildren = React.ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;
type THTMLProps = React.HTMLAttributes<HTMLDivElement>;
export const IconButton = ({ children, className, ...props }: TButtonPropsWithChildren) => (
    <button className={classNames('border rounded p-1 w-9 h-9', className)} {...props}>
        {children}
    </button>
);

export const Vr = ({ className }: THTMLProps) => <div className={classNames(className, 'border')}></div>;
