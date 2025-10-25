

export class RefuseConnectDB extends Error {
    constructor(message: string = "Refuse connect to DB") {
        super(message);
    }
}