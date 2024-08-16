"use client";

import { useState } from "react";

import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/app/components/Button";
import Link from "next/link";
import Api from "@/services/api";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const api = new Api();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) return alert("Preencha todos os campos!");

        if (password != confirmPassword) return alert("As senhas não coincidem!");

        const res = await api.createUser({
            name,
            email,
            password,
        });

        if (!res) return alert("Error ao criar usuário");

        router.push("/auth/signin");
    };

    return (
        <div
            className={
                "bg-white flex p-10 shadow border rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col"
            }
        >
            <Image src={logo} alt="logo" width={300} />
            <div className={"w-full"}>
                <TextInput
                    state={{ current: name, setValue: setName }}
                    type={"text"}
                    label={"Seu nome completo:"}
                ></TextInput>
                <TextInput state={{ current: email, setValue: setEmail }} type={"email"} label={"E-mail:"}></TextInput>
                <TextInput
                    state={{ current: password, setValue: setPassword }}
                    type={"password"}
                    label={"Senha:"}
                ></TextInput>
                <TextInput
                    state={{ current: confirmPassword, setValue: setConfirmPassword }}
                    type={"password"}
                    label={"Confirme sua senha:"}
                ></TextInput>
            </div>
            <div className={"w-full flex flex-col"}>
                <p className={"self-end text-cyan-900 text-sm"}>
                    Já possui uma conta?
                    <Link href={"/auth/signin"}> Fazer o login</Link>
                </p>
            </div>
            <div className={"flex flex-col w-full items-center mt-4"}>
                <Button onClick={handleSignUp} color={"green"} label={"Criar Conta"}></Button>
            </div>
        </div>
    );
}
