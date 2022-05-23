class CustomError extends Error {

    CustomError(message) {
        this.message = message;
    }
}


module.exports = { CustomError };