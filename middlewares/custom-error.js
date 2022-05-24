class ApiError extends Error {

    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static internalError(message) {
        return new ApiError(500, message);
    }
}


module.exports = { ApiError };