

export class NotFoundUser extends Error {
    constructor(message: string = "User not found") {
        super(message);
        this.name = "NotFoundUser";
    }
}