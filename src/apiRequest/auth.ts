import { http } from "@/lib/http"
import { LoginBody, LoginResponseType, RegisterBody, RegisterResponseType, VerifyAccountBodyType } from "@/schemaValidations/auht.schema"

const authApiRequest = {
  login: (body: LoginBody) =>
    http.post<LoginResponseType>('/auth/login', body),
  register: (body: RegisterBody) => 
    http.post<RegisterResponseType>('/auth/register', body),
  verifyAccount: (body: VerifyAccountBodyType) =>
    http.post<object>('/auth/verify', body),
  resendCode: (body: { email: string }) =>
    http.post<object>('/auth/resend-code', body),
  getEmailByUsername: (body: { username: string }) =>
    http.post<{ email: string }>('/users/get-email-by-username', body)
}

export default authApiRequest
