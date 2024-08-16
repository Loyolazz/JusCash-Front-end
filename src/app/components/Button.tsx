interface IButton {
    enable?: boolean;
    color: string;
    label: string;
    onClick: () => void;
    border?: boolean;
    textColor?: string;
    style?: string;
}

export default function Button({ enable = true, color, label, onClick, border, textColor = "white", style }: IButton) {
    return (
        <button
            disabled={!enable}
            className={`py-1 px-4 rounded-lg text-lg shadow w-40 ${border ? "border-2" : ""} ${
                textColor ? "text-" + textColor : ""
            } ${style}`}
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
