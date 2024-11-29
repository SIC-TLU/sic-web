import { http } from "@/lib/http"
import { LoginBody, LoginResponseType, RegisterBody, RegisterResponseType } from "@/schemaValidations/auht.schema"

const authApiRequest = {
  login: (body: LoginBody) =>
    http.post<LoginResponseType>('/auth/login', body),
  register: (body: RegisterBody) => 
    http.post<RegisterResponseType>('/auth/register', body)
}

export default authApiRequest
