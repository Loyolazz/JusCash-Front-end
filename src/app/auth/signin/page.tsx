'use client'
import {useState} from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg"
import Button from "@/app/components/Button";
import Link from "next/link";
import LeadModal from "@/app/components/LeadModal";

export default function SignIn() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={'bg-white flex p-10 shadow border rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col'}>
            <Image src={logo} alt="logo" width={300}/>
            <div className={'w-full'}>
                <TextInput type={'email'} label={'E-mail:'}></TextInput>
                <TextInput type={'password'} label={'Senha:'}></TextInput>
            </div>
            <div className={'w-full flex flex-col'}>
                <p className={'self-end text-cyan-900 text-sm'}>Não possui uma conta?
                    <Link href={'/auth/signup'} > Cadastre-se</Link></p>
            </div>
            <div className={'flex flex-col w-full items-center mt-4'}>
                <Button color={'green'} label={'Entrar'} onClick={() => setModalOpen(true)}></Button>
            </div>
            <LeadModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </div>
    )
}