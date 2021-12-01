import { Response } from "express";

export interface ParamsException {
  status?: number
  message: string,
  errors?: { [key: string]: string[] },
  name?: string
}

export class ParseErrorResponse {
  constructor(private error: ParamsException) {}

  public response(res: Response) {
    const status = this.error?.status || 501;
    return res.status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: this.error.message,
        code: this.error.name,
        errors: this.error.errors
      })
  }
}