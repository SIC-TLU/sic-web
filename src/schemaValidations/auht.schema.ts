import { z } from 'zod'

// Login Schema
export const loginBody = z.object({
  username: z.string().min(3),
  password: z.string().min(6).max(100)
}).strict()

export type LoginBody = z.TypeOf<typeof loginBody>

export const loginResponse = z.object({
  user: z.object({
    _id: z.string(),
    email: z.string().email(),
    username: z.string(),
  }),
  accessToken: z.string(),
})

export type LoginResponseType = z.TypeOf<typeof loginResponse>

// Register Schema
export const registerBody = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

export type RegisterBody = z.TypeOf<typeof registerBody>

export const registerResponse = z.object({
  _id: z.string()
})

export type RegisterResponseType = z.TypeOf<typeof registerResponse>

export const registerForm = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "The password did not match",
  path: ["confirmPassword"]
})

export type RegisterFormType = z.TypeOf<typeof registerForm>
