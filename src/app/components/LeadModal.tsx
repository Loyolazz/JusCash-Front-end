"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import CheckBox from "@/app/components/CheckBox";
import Api from "@/services/api";
import { Status } from "@/utils/statusEnum";
import { useRouter } from "next/navigation";
import {useSession} from "next-auth/react";

interface ILeadModal {
    mode: "create" | "show";
    initiaData?: {
        name: string;
        email: string;
        phone: string;
    };
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const api = new Api();

const CHECKBOXES = [
    {
        id: "1",
        label: "Todos",
        checked: false,
    },
    {
        id: "2",
        label: "Honorários Sucumbenciais",
        checked: false,
    },
    {
        id: "3",
        label: "Honorários Contratuais",
        checked: false,
    },
    {
        id: "4",
        label: "Honorários Dativos",
        checked: false,
    },
    {
        id: "5",
        label: "Crédito do Autor",
        checked: false,
    },
];

export default function LeadModal({ mode, initiaData, modalOpen, setModalOpen }: ILeadModal) {
    const router = useRouter();
    const session = useSession();
    const user: any = session.data;

    const [name, setName] = useState(initiaData?.name || '');
    const [email, setEmail] = useState(initiaData?.email || '');
    const [phone, setPhone] = useState(initiaData?.phone || '');

    const [checkboxs, setCheckboxs] = useState(CHECKBOXES);

    useEffect(() => {
        console.log(name, email, phone);
    }, [name, email, phone]);

    function handleChangeCheckbox(e: any) {
        if (e.target.id == "1") {
            setCheckboxs((prevState) => {
                const newState = prevState.map((item) => {
                    return {
                        ...item,
                        checked: e.target.checked,
                    };
                });

                return [...newState];
            });
        } else {
            const newItems = checkboxs.map((item) => {
                if (item.id === e.target.id) {
                    return {
                        ...item,
                        checked: e.target.checked,
                    };
                }
                return item;
            });
            setCheckboxs([...newItems]);
        }

        console.log(checkboxs[0].checked);
    }

    const handleCreateLead = async () => {
        if (!name || !email || !phone) return alert("Preencha todos os campos!");
        if (!user) return;
        const api = new Api(user.token);
        const opportunities = checkboxs.map((item) => {
            if (item.checked) {
                return item.label;
            }
        }) as any;

        await api.createLead({
            name,
            email,
            phone,
            status: Status[0],
            opportunities: opportunities,
        });

        router.refresh();
        setModalOpen(false);
    };

    return (
        <div
            className={
                "w-screen h-screen absolute top-0 z-10 flex backdrop-blur-sm bg-black bg-opacity-30 justify-center items-center"
            }
            style={{ display: modalOpen ? "flex" : "none" }}
        >
            <div
                className={
                    "bg-white flex p-10 shadow border relative rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col"
                }
            >
                <button onClick={() => setModalOpen(false)} className={"text-end absolute top-5 right-8 text-2xl"}>
                    {" × "}
                </button>
                <h2 className={"text-2xl font-semibold"}>Novo Lead</h2>
                <div className={"w-full"}>
                    <p className={"text-lg text-gray-600 font-medium"}> Dados do Lead </p>
                    <TextInput
                        enable={mode == "create" ? true : false}
                        state={{ current: name , setValue: setName }}
                        type={"text"}
                        label={`Nome Completo:`}
                    ></TextInput>
                    <TextInput
                        enable={mode == "create" ? true : false}
                        state={{ current: email , setValue: setEmail }}
                        type={"email"}
                        label={"Email:"}
                    ></TextInput>
                    <TextInput
                        enable={mode == "create" ? true : false}
                        state={{ current: phone , setValue: setPhone }}
                        type={"text"}
                        label={"Telefone:"}
                    ></TextInput>
                </div>
                <div className={"w-full flex flex-col"}>
                    Oportunidades
                    {checkboxs.map((checkbox, index) => {
                        return (
                            <CheckBox
                                enable={mode == "create" ? true : false}
                                key={index}
                                id={checkbox.id}
                                label={checkbox.label}
                                checked={checkbox.checked}
                                onChange={handleChangeCheckbox}
                            />
                        );
                    })}
                </div>
                <div className={"flex flex-row justify-end gap-2"}>
                    <div className={"flex flex-col w-full items-center mt-4"}>
                        <Button
                            enable={mode == "create" ? true : false}
                            color={"white"}
                            border
                            label={"Cancelar"}
                            textColor={"gray-500"}
                            onClick={() => setModalOpen(false)}
                        />
                    </div>
                    <div className={"flex flex-col w-full items-center mt-4"}>
                        <Button
                            enable={mode == "create" ? true : false}
                            color={"#002355"}
                            border
                            label={"Salvar"}
                            onClick={handleCreateLead}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
