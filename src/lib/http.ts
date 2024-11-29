/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config";
import { EntityError } from "./error";
import { showErrorToast } from "./ultils-client";

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401
const BAD_REQUEST_STATUS = 400

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
  response?: any;
}

export const isClient = () => typeof window !== 'undefined'
let clientLogoutRequest: null | Promise<any> = null

/**
 * This fucntion create header attach in request to send to server
 * @param options Base option send from client
 * @returns Headers
 */
const createHeaders = (options?: CustomOptions): HeadersInit => {
  const headers: Record<string, string> = options?.body instanceof FormData ? {} : {
    'Content-Type': 'application/json'
  }

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      headers.Authorization = `Bearer ${sessionToken}`
    }
  }

  return { ...headers, ...options?.headers }
}

/**
 * If not passed baseUrl (or baseUrl = undefined) => get url from envConfig.NEXT_PUBLIC_API_ENDPONT
 * If passed baseUrl => get value has passed
 * If passed '' => call API to Next.js Server
 */
const getBaseUrl = (url: string, baseUrl?: string): string => {
  const effectiveBaseUrl = baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPONT : baseUrl
  return url.startsWith('/') ? `${effectiveBaseUrl}${url}` : `${effectiveBaseUrl}/${url}`
}

const handleAuthenticationError = async (baseHeaders: HeadersInit, options?: CustomOptions) => {
  if (isClient()) {
    if (!clientLogoutRequest) {
      clientLogoutRequest = fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ force: true }),
        headers: { ...baseHeaders }
      })

      try {
        await clientLogoutRequest
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error('Http error!')
      } finally {
        localStorage.removeItem('sessionToken')
        localStorage.removeItem('sessionTokenExpiresAt')
        clientLogoutRequest = null
        location.href = '/login'
      }
    }
  } else {
    const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1]
    if (options?.response) {
      options.response.statusCode = 302;
      options.response.setHeader('Location', `/logout?sessionToken=${sessionToken}`);
      options.response.end();
    }
  }
}

const handleBadRequestError = (data: IBackendRes<any>, options?: CustomOptions) => {
  // Display a toast message of error.
  if (isClient()) {
    showErrorToast({ title: data.error, description: data.message as string })
  }

  // If running on the server, add dynamic server-side behavior.
  if (options?.response) {
    options.response.statusCode = 400;
    options.response.end(`Bad Request: ${data.message || 'An error occurred.'}`);
  }
}

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders = createHeaders(options)
  const fullUrl = getBaseUrl(url, options?.baseUrl)

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body,
    method
  })

  const data: IBackendRes<Response> = await res.json()

  // Interceptor
  if (!res.ok) {
    switch (res.status) {
      case ENTITY_ERROR_STATUS:
        throw new EntityError({
          status: res.status,
          error: data.error as string,
          message: data.message
        })

      case AUTHENTICATION_ERROR_STATUS:
        await handleAuthenticationError(baseHeaders, options)
        break
      case BAD_REQUEST_STATUS:
        handleBadRequestError(data, options)
        break
      default:
        throw new Error(`Http error! Status:${res.status}`)
    }
  }

  return data
}

export const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options })
  }
}
