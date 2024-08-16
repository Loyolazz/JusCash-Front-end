"use client";

interface ICheckBox {
    enable?: boolean;
    id: string;
    label: string;
    name: string;
    checked?: boolean;
    onChange: any;
}

export default function CheckBox({ enable = true, label, name, id, checked, onChange }: any) {

    return (
        <div className={"flex flex-row items-center gap-1 my-0.5"}>
            <input disabled={!enable} type="checkbox" id={id} name={name} value={checked} onChange={onChange} checked={checked} />
            <label className={"text-sm"} htmlFor={id}>
                {" "}
                {label}{" "}
            </label>
        </div>
    );
}
