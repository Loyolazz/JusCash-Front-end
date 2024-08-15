import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg"
import Button from "@/app/components/Button";
import Link from "next/link";

export default function SignUp() {
    return (
        <div
            className={'bg-white flex p-10 shadow border rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col'}>
            <Image src={logo} alt="logo" width={300}/>
            <div className={'w-full'}>
                <TextInput type={'text'} label={'Seu nome completo:'}></TextInput>
                <TextInput type={'email'} label={'E-mail:'}></TextInput>
                <TextInput type={'password'} label={'Senha:'}></TextInput>
                <TextInput type={'password'} label={'Confirme sua senha:'}></TextInput>
            </div>
            <div className={'w-full flex flex-col'}>
                <p className={'self-end text-cyan-900 text-sm'}>Já possui uma conta?
                    <Link href={'/auth/signin'}> Fazer o login</Link></p>
            </div>
            <div className={'flex flex-col w-full items-center mt-4'}>
                <Button color={'green'} label={'Criar Conta'}></Button>
            </div>
        </div>
    )
}