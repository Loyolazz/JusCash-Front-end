
interface ICheckBox{
    label: string;
    name: string;
    checked?: boolean;
    id: string;
}

export default function CheckBox ({label, name, id, checked}: any) {
    return (
        <div className={'flex flex-row items-center gap-1 my-0.5'}>
            <input type="checkbox" id={id} name={name} checked/>
            <label className={'text-sm'} htmlFor={id}> {label} </label>
        </div>
    )
}