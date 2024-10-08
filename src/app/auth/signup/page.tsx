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
    const [loading, setLoading] = useState(false); // Loading state

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) return alert("Preencha todos os campos!");
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return alert("E-Mail Inválido");
        if (!/^.{6,10}$/.test(password)) return alert("A senha deve conter de 6 a 10 caracteres");
        if (password !== confirmPassword) return alert("As senhas não coincidem!");

        setLoading(true); // Start loading
        const res = await api.createUser({
            name,
            email,
            password,
        });
        setLoading(false); // Stop loading

        if (!res) return alert("Erro ao criar usuário");

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
                <TextInput
                    regex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                    state={{ current: email, setValue: setEmail }}
                    type={"email"}
                    label={"E-mail:"}
                ></TextInput>
                <TextInput
                    regex={/^.{6,10}$/}
                    state={{ current: password, setValue: setPassword }}
                    type={"password"}
                    label={"Senha:"}
                ></TextInput>
                <TextInput
                    regex={/^.{6,10}$/}
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
                <Button onClick={handleSignUp} color={"green"} label={loading ? "Criando..." : "Criar Conta"} disabled={loading}></Button>
                {loading && <p className={"mt-2 text-cyan-900 text-sm"}>Aguarde, estamos criando sua conta...</p>}
            </div>
        </div>
    );
}
