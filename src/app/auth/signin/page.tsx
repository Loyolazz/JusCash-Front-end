"use client";
import { useState } from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/app/components/Button";
import Link from "next/link";
import LeadModal from "@/app/components/LeadModal";
import Api from "@/services/api";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

export default function SignIn() {
    const api = new Api();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        if (!email || !password) return alert("Preencha todos os campos!");

        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        });
        if (result?.error) {
            alert('Ocorreu um erro no login :(\nTente mais tarde!');
            return;
        }
        router.push("/dashboard");
    };

    return (
        <div
            className={
                "bg-white flex p-10 shadow border rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col"
            }
        >
            <Image src={logo} alt="logo" width={300} />
            <div className={"w-full"}>
                <TextInput state={{ current: email, setValue: setEmail }} type={"email"} label={"E-mail:"}></TextInput>
                <TextInput
                    state={{ current: password, setValue: setPassword }}
                    type={"password"}
                    label={"Senha:"}
                ></TextInput>
            </div>
            <div className={"w-full flex flex-col"}>
                <p className={"self-end text-cyan-900 text-sm"}>
                    Não possui uma conta?
                    <Link href={"/auth/signup"}> Cadastre-se</Link>
                </p>
            </div>
            <div className={"flex flex-col w-full items-center mt-4"}>
                <Button color={"green"} label={"Entrar"} onClick={handleSignIn}></Button>
            </div>
        </div>
    );
}
