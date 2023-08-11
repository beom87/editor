export const requestAnimation = ({ onUpdate }: { onUpdate?: (value: number) => void }) => {
    let progress = 0;
    let value = 0;
    let startTime = 0;

    const run = () => {
        startTime = Date.now();
        const update = () => {
            value = Date.now() - startTime;
            progress = requestAnimationFrame(update);
            onUpdate?.(value);
        };
        requestAnimationFrame(update);
    };
    const stop = () => {
        cancelAnimationFrame(progress);
    };
    const reset = () => {
        startTime = Date.now();
    };

    return { run, stop, reset };
};
