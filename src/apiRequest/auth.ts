import { http } from "@/lib/http"
import { LoginBody, LoginResponseType, RegisterBody, RegisterResponseType, VerifyAccountBodyType } from "@/schemaValidations/auht.schema"

const authApiRequest = {
  login: (body: LoginBody) =>
    http.post<LoginResponseType>('/auth/login', body),
  register: (body: RegisterBody) => 
    http.post<RegisterResponseType>('/auth/register', body),
  verifyAccount: (body: VerifyAccountBodyType) =>
    http.post<object>('/auth/verify', body),
}

export default authApiRequest
