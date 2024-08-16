"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/app/components/Button";
import logo from "../../../public/logo.svg";
import DraggabbleRow from "../components/DraggableRow";
import LeadModal from "../components/LeadModal";
import Api from "@/services/api";

const api = new Api();

export default function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        api.getLeads().then((response) => {
            setLeads(response.data);
        });
    }, []);

    return (
        <div className={"flex flex-col items-center h-full w-full"}>
            <Image className={"my-10"} src={logo} alt="logo" width={300} />

            <div className={"w-full bg-gray-200 flex flex-col items-end"}>
                <div className={"py-4 px-8"}>
                    <Button
                        style={"text-[15px] font-light"}
                        color={"#002355"}
                        label={"+ Novo Lead"}
                        onClick={() => setModalOpen(true)}
                    />
                </div>

                <div className={"grid grid-cols-3 w-full border-y-[0.5px] border-gray-300"}>
                    <div className={"bg-white py-4 border text-center text-sm"}>Cliente Potencial</div>
                    <div className={"bg-white py-4 border text-center text-sm"}>Dados Confirmados</div>
                    <div className={"bg-white py-4 border text-center text-sm"}>Analise do Lead</div>
                </div>

                {leads.map((lead: any, index) => {
                    return <DraggabbleRow data={lead} key={lead} index={index} id={1} name={lead.name} />;
                })}
            </div>

            <LeadModal mode="create" modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}
