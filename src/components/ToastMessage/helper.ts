const stack = new Set<HTMLDivElement>();

export const createToastElement = (message = '') => {
    const container = document.createElement('div');
    const toastElement = document.createElement('div');

    container.classList.add('fixed', 'transition-all', 'text-center', 'w-full', 'duration-300', 'z-[9999]', 'pointer-events-none');
    container.style.top = '-45px';

    toastElement.classList.add('w-fit', 'm-auto', 'bg-white', 'font-bold', 'pt-1', 'pb-1', 'px-4', 'rounded-lg', 'my-2', 'drop-shadow-lg');
    toastElement.innerText = message;

    stack.add(container);

    container.appendChild(toastElement);
    document.body.appendChild(container);

    return container;
};

export const removeToastElement = (toastElement: HTMLDivElement) => {
    if (toastElement.parentNode) toastElement.parentNode.removeChild(toastElement);
    else toastElement.remove();

    stack.delete(toastElement);
};

export const transitionToast = () => {
    stack.forEach((t) => (t.style.top = `${parseInt(t.style.top) + 45}px`));
};
