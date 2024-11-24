"use server"
import { redirect } from "next/navigation";


export async function startBot(data: FormData) {
    console.log(data)
    redirect("/chat")
}
