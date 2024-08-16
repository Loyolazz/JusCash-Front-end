
interface IButton{
    color: string;
    label: string;
    onClick: () => void;
    border?: boolean;
    textColor?: string;
    style?: string;
}

export default function Button ({color, label, onClick, border, textColor, style}: IButton) {

    return(
        <button className={`py-1 px-4 rounded-lg text-white text-lg shadow w-40 ${border ? 'border-2' : ''} ${textColor ? 'text-' + textColor : ''} ${style}`}
                style={{backgroundColor: color}}
                onClick={onClick}

        >{label}</button>
    )
}