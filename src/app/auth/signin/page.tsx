"use client";
import { useState } from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/app/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleSignIn = async () => {
        if (!email || !password) return alert("Preencha todos os campos!");
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return alert("E-Mail Inválido");
        if (!/^.{6,10}$/.test(password))
            return alert("A senha deve conter de 6 a 10 caracteres");

        setLoading(true); // Start loading
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });
        setLoading(false); // Stop loading

        if (result?.error) {
            alert("Ocorreu um erro no login :(\nTente mais tarde!");
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
                <TextInput
                    regex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                    state={{ current: email, setValue: setEmail }}
                    type={"email"}
                    label={"E-mail:"}
                />
                <TextInput
                    regex={/^.{6,10}$/}
                    state={{ current: password, setValue: setPassword }}
                    type={"password"}
                    label={"Senha:"}
                />
            </div>
            <div className={"w-full flex flex-col"}>
                <p className={"self-end text-cyan-900 text-sm"}>
                    Não possui uma conta?
                    <Link href={"/auth/signup"}> Cadastre-se</Link>
                </p>
            </div>
            <div className={"flex flex-col w-full items-center mt-4"}>
                <Button
                    color={"green"}
                    label={loading ? "Entrando..." : "Entrar"}
                    onClick={handleSignIn}
                    disabled={loading}
                />
                {loading && <p className={"mt-2 text-cyan-900 text-sm"}>Aguarde, estamos processando seu login...</p>}
            </div>
        </div>
    );
}
