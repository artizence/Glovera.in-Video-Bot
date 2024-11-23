"use server"
import { redirect } from "next/navigation";


export async function startBot(data: FormData) {
    redirect("/chat")
}
