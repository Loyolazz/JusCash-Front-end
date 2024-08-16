"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import CheckBox from "@/app/components/CheckBox";
import Api from "@/services/api";
import { Status } from "@/utils/statusEnum";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Opportunities, CHECKBOXES } from "@/utils/opportunities";

interface ILeadModal {
    mode: "create" | "show";
    initiaData?: {
        name: string;
        email: string;
        phone: string;
        opportunities: string[];
    };
    modalOpen: boolean;
    setModalOpen: any;
    setLeads?: any;
}

export default function LeadModal({ mode, initiaData, modalOpen, setModalOpen, setLeads }: ILeadModal) {
    const router = useRouter();
    const session = useSession();
    const user: any = session.data;

    const [name, setName] = useState(initiaData?.name || "");
    const [email, setEmail] = useState(initiaData?.email || "");
    const [phone, setPhone] = useState(initiaData?.phone || "");

    const [checkboxs, setCheckboxs] = useState(initiaData ? Opportunities(initiaData.opportunities) : CHECKBOXES);

    useEffect(() => {
    }, [name, email, phone]);

    useEffect(() => {}, [checkboxs]);

    function handleChangeCheckbox(e: any, item: any) {
        let newCheckboxs: any = checkboxs.map((item) => {
            if (item.id === e.target.id) {
                return {
                    ...item,
                    checked: e.target.checked,
                };
            }
            return item;
        });
        setCheckboxs(newCheckboxs);
    }

    function handleSelectAllCheckboxs(e: any) {
        let newCheckboxs = checkboxs.map((item) => {
            return {
                ...item,
                checked: e.target.checked,
            };
        });
        setCheckboxs(newCheckboxs);
    }

    const checkBoxesAll = () => {
        let checkboxzs = checkboxs.filter((item) => item.checked === false);
        return checkboxzs.length <= 0;
    };

    const formatPhoneNumber = (value: any) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneLength = phoneNumber.length;

        if (phoneLength <= 2) return `(${phoneNumber}`;
        if (phoneLength <= 6) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        if (phoneLength <= 10) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;

        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handlePhoneChange = (event: any) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };

    const handleCreateLead = async () => {
        if (!name || !email || !phone) return alert("Preencha todos os campos!");
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return alert("E-Mail Inválido");
        if (!user) return;
        const api = new Api(user.token);
        const opportunities = checkboxs.map((item) => {
            if (item.checked) {
                return item.id;
            }
        }) as any;

        const lead = await api.createLead({
            name,
            email,
            phone,
            status: Status[0],
            opportunities: opportunities,
        });

        if (lead) {
            setLeads((prevState: any) => {
                return [...prevState, lead];
            });
        }

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
                        state={{ current: name, setValue: setName }}
                        type={"text"}
                        label={`Nome Completo:`}
                    ></TextInput>
                    <TextInput
                        regex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                        enable={mode == "create" ? true : false}
                        state={{ current: email, setValue: setEmail }}
                        type={"email"}
                        label={"Email:"}
                    ></TextInput>
                    <TextInput
                        enable={mode == "create" ? true : false}
                        state={{ current: phone, setValue: setPhone }}
                        type={"tel"}
                        label={"Telefone:"}
                        onChange={handlePhoneChange}
                    ></TextInput>
                </div>
                <div className={"w-full flex flex-col"}>
                    Oportunidades
                    <CheckBox
                        enable={mode == "create" ? true : false}
                        label={"Todos"}
                        checked={checkBoxesAll()}
                        onChange={(e: any) => handleSelectAllCheckboxs(e)}
                    />
                    {checkboxs.map((checkbox, index) => {
                        return (
                            <CheckBox
                                enable={mode == "create" ? true : false}
                                key={index}
                                id={checkbox.id}
                                label={checkbox.label}
                                checked={checkbox.checked}
                                onChange={(e: any) => handleChangeCheckbox(e, checkbox)}
                            />
                        );
                    })}
                </div>
                <div className={"flex flex-row justify-end gap-2"}>
                    <div className={"flex flex-col w-full items-center mt-4"}>
                        <Button
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
                            color={"#0066ce"}
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
