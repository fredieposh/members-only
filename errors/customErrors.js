class CustomNotFoundError extends Error {
    constructor(message = "404 - Page not Found") {
        super(message);
        this.statusCode = 404;
        this.name = 'NotFoundError';

        Error.captureStackTrace(this, this.constructor);
    };
}

class CustomNotAuthError extends Error {
    constructor(message = '401 - Unauthorized') {
        super(message);
        this.statusCode = 401;
        this.name = 'UnAuthorizedError';
    };
}

class CustomForbiddenError extends Error {
    constructor(message = "403 - forbidden") {
        super(message);
        this.statusCode = 403;
        this.name = 'ForbiddenError';
    };
}

class CustomBadReqError extends Error {
    constructor(message = "400 - Bad Request") {
        super(message);
        this.statusCode = 400;
        this.name = 'BadRequestError';
    };
}

module.exports = {
    CustomNotFoundError 
    ,CustomNotAuthError 
    ,CustomForbiddenError 
    ,CustomBadReqError
};