
import { IUserModel, UserModel } from "../models/User.js";

interface IUserService {
    create(id: number, firstName: string, username: string | undefined): Promise<IUserModel>;
    findById(id: number): Promise<IUserModel | null>;
}

class UserService implements IUserService {
    constructor() {}

    public async create(
        id: number,
        firstName: string,
        username: string | undefined
    ): Promise<IUserModel> {
        const newUser = new UserModel({
            telegramID: id,
            firstName: firstName,
            username: username
        });
        newUser.save();

        return newUser
    }

    public async findById(id: number | undefined): Promise<IUserModel | null> {
        if (!id) {
            return null
        }
        const existingUser = await UserModel.findOne({ telegramID: id });
        if (!existingUser) {
            return null;
        }
        return existingUser
    }
}

export {
    UserService,
    IUserService
}