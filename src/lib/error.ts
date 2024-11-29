/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from "next-auth"

interface HttpErrorType {
  status: number;
  error: string;
  message: string | string[];
}

export class HttpError extends Error {
  status: number;
  error: string;
  detailMessage: string | string[];

  constructor({ status, error, message }: HttpErrorType) {
    super('Http error!')
    this.status = status
    this.error = error
    this.detailMessage = message
  }
}

export class EntityError extends HttpError {
  constructor({ status = 422, error, message }: HttpErrorType) {
    super({ status, error, message })
  }
}

export class customAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super()
    this.type = message
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Email/Password invalid"
}

export class InactiveAccountError extends AuthError {
  static type = "Account has not been activated"
}
