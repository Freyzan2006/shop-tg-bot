

export class NotFoundEnvironment extends Error {
    constructor(key: string) {
        super(`Environment variable ${key} is not defined`);
    }
}