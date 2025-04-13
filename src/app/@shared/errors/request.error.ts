export interface RequestErrorOptions<T> {
  statusCode: number;
  errors?: T[];
}

export class RequestError<T> {
  private statusCode: number;
  private message: string;
  private errors?: T[];
  private timestamp: Date;

  constructor(message: string, options: RequestErrorOptions<T>) {
    this.statusCode = options.statusCode;
    this.message = message;
    this.errors = options.errors ?? [];
    this.timestamp = new Date();
  }

  public get getStatusCode() {
    return this.statusCode;
  }
}
