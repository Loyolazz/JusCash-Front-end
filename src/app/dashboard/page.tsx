'use client'
import logo from "../../../public/logo.svg";
import Image from "next/image";
import Button from "@/app/components/Button";

export default function Dashboard() {
    return (
        <div className={'flex flex-col items-center h-full w-full'}>
            <Image className={'my-10'} src={logo} alt="logo" width={300}/>
            <div className={'w-full bg-gray-200 flex flex-col items-end'}>
                <div className={'py-4 px-8'}>
                <Button style={''} color={'blue'} label={'+ Novo Lead'} onClick={() => ''}/>
                </div>
                <div className={'grid grid-cols-3 w-full'}>
                    <div className={'bg-white py-4 border text-center text-sm'}>
                        Cliente Potencial
                    </div>
                    <div className={'bg-white py-4 border text-center text-sm'}>
                        Dados Confirmados
                    </div>
                    <div className={'bg-white py-4 border text-center text-sm'}>
                        Analise do Lead
                    </div>
                </div>
            </div>
        </div>
    )
}