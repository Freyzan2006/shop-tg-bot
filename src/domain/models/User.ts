import { Document, model, Schema } from "mongoose";

export interface IUserModel extends Document {
    telegramID: number;
    firstName: string;
    username: string;
    createdAt: Date;
};

const userSchema = new Schema<IUserModel>({
    telegramID: {
        type: Number,
        required: [true, "Telegram ID is required"],
        unique: true
    },
    firstName: { type: String },
    username: { type: String },
}, {
    timestamps: true
});

export const UserModel = model<IUserModel>("User", userSchema);