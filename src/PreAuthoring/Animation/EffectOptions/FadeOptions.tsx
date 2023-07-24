type TFadeOptionsProps = { type: string };

export default function FadeOptions({ type }: TFadeOptionsProps) {
    return (
        <button className="p-1 w-full flex items-center gap-x-1 justify-between">
            <span>{type}</span>
        </button>
    );
}
