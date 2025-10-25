import 'dotenv/config';
import { NotFoundEnvironment } from "infrastructure/exception/NotFoundEnvironment.exception";


type envKeyType = "BOT_TOKEN" | "MONGODB_URI" | "PAYMENT_TOKEN";

interface IEnvironment {
    get(key: envKeyType): string
}

class Environment implements IEnvironment {
    /**
     * Получает значение из окружающей среды
     * @param {envKeyType} key - ключ значения
     * @returns {T} - значение
     * @throws {NotFoundEnvironment} если значение не найдено
     */
    public get(key: envKeyType): string {
        const value = process.env[key];
        if (!value) {
            throw new NotFoundEnvironment(key);
        }

        return value;
    }
}

export {
    Environment,
    IEnvironment
}


