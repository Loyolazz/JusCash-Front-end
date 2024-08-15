'use client'
import TextInput from "@/app/components/TextInput";
import Link from "next/link";
import Button from "@/app/components/Button";
import CheckBox from "@/app/components/CheckBox";

export default function LeadModal({modalOpen, setModalOpen}: any) {
    return (
        <div
            className={'w-screen h-screen absolute z-10 flex backdrop-blur-sm bg-black bg-opacity-30 justify-center items-center'}
            style={{display: modalOpen ? 'flex' : 'none'}}>
            <div
                className={'bg-white flex p-10 shadow border relative rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col'}>
                <button onClick={() => setModalOpen(false)} className={'text-end absolute top-5 right-8 text-2xl'}> × </button>
                <h2 className={'text-2xl font-semibold'}>
                    Novo Lead
                </h2>
                <div className={'w-full'}>
                    <p className={'text-lg text-gray-600 font-medium'}> Dados do Lead </p>
                    <TextInput type={'text'} label={'Nome Completo: '}></TextInput>
                    <TextInput type={'email'} label={'Email: '}></TextInput>
                    <TextInput type={'text'} label={'Telefone: '}></TextInput>
                </div>
                <div className={'w-full flex flex-col'}>
                    Oportunidades
                    <CheckBox label={'Todos'}/>
                    <CheckBox label={'Honorários Sucumbenciais'}/>
                    <CheckBox label={'Honorários Contratuais'}/>
                    <CheckBox label={'Honorários Dativos'}/>
                    <CheckBox label={'Crédito do Autor'}/>
                </div>
                <div className={'flex flex-row justify-end gap-2'}>
                    <div className={'flex flex-col w-full items-center mt-4'}>
                        <Button color={'trasparent'} border label={'Cancelar'} textColor={'gray-600'} onClick={() => setModalOpen(false)}></Button>
                    </div>
                    <div className={'flex flex-col w-full items-center mt-4'}>
                        <Button color={'blue'} label={'Salvar'} onClick={() => setModalOpen(false)}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}