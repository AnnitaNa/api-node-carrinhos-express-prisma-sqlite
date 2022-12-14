export interface ResponseBody<T> {
    statusCode: number,
    response: T | string
}

export class OK<T> implements ResponseBody<any> {
    statusCode: number = 200
    response: T | string = "Success!"

    constructor(msg?: T) {
        if (msg) this.response = msg;
    }
}

export class Created<T> implements ResponseBody<any> {
    statusCode: number = 201
    response: T | string = "Created with success!"

    constructor(msg?: T) {
        if (msg) this.response = msg;
    }
}

export class NotFound implements ResponseBody<string> {
    statusCode: number = 404
    response: string = "Not found"

    constructor(msg?: string) {
        if (msg) this.response = msg;
    }
}

export class Conflict implements ResponseBody<string> {
    statusCode: number = 409
    response: string = "there is a conflict with our DB"

    constructor(msg?: string) {
        if (msg) this.response = msg;
    }
}