export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

}

export class BadRequestError extends ApiError {

    constructor(message: string) {
        super(message, 400);
    }

}

export class UnauthorizedError extends ApiError {

    constructor(message: string) {
        super(message, 401);
    }

}

export class ForbiddenError extends ApiError {

    constructor(message: string) {
        super(message, 403);
    }

}

export class InternalServorError extends ApiError {

    constructor(message: string) {
        super(message, 500);
    }

}

export class NotFoundError extends ApiError {

    constructor(message: string) {
        super(message, 404);
    }

}