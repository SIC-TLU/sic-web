/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from "@/auth"

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username,
      password,
      // callbackUrl: "/",
      redirect: false,
    })
    return r
  } catch (error: any) {
    if (error.name === "InvalidEmailPasswordError") {
      return {
        error: error.type,
        code: 1
      }
    } else if (error.name === "InactiveAccountError") {
      return {
        error: error.type,
        code: 2
      }
    } else {
      return {
        error: "Internal server error",
        code: 0
      }
    }
  }
}
