"use server"

import { redirect } from "next/navigation"

export async function login(data : FormData) {
    console.log(data)
    redirect("/student/details")
}


export async function signup(data: FormData) {
    redirect("/student/login")
}