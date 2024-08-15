
interface ITextInput{
    type: string;
    label: string;
}

export default function TextInput ({type, label}: ITextInput) {

    return(
            <label className={'flex flex-col text-cyan-900 text-sm gap-2 my-2'}> {label}
                <input className={'border-2 p-2 rounded-lg'} type={type}></input>
            </label>
    )
}