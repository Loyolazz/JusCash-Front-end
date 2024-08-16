import { CreateLead, Lead } from "@/models/LeadModel";
import { CreateUser } from "@/models/UserModel";
import axios, { AxiosInstance } from "axios";

export default class Api {
    private api: AxiosInstance;

    constructor(token: string = "") {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
        });
    }

    async createLead(leadData: CreateLead): Promise<Lead | null> {
        const response = await this.api.post(
            "/lead",
            {
                ...leadData,
            },
            {
                withCredentials: false,
            }
        );

        if (!response.data) throw new Error("Erro ao criar o lead");

        return response.data;
    }

    async getLeads() {
        const leads = await this.api.get("/leads");
        return leads;
    }

    async createUser(userData: CreateUser) {
        const res = await this.api.post("/user", userData);

        if (res.status === 201) {
            return true;
        }
    }

    async login(credentials: { email: string; password: string }) {
        const res = await this.api.post("/auth/login", credentials);

        return res;
    }

    async updateLead(data: { id: number; status: string }) {
        await this.api.put("/lead", data);
    }
}
