class UserError extends Error {
    constructor(msg: string, public errorCode?: number) {
        super(msg)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserError)
        }

        this.name = 'UserError'
        this.errorCode = errorCode || 400;

    }
}

export { UserError }