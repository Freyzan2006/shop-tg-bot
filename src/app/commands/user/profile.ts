import { MyContext } from "app/types";
import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { userService } from "../di";


export const profileCommand = async (ctx: CallbackQueryContext<MyContext>) => {
    ctx.answerCallbackQuery();

    const user = await userService.findById(ctx.from?.id);
    if (!user) {
        return ctx.callbackQuery.message?.editText(
            "Для доступа к профилю необходимо зарегистрироваться, используете команду /start",
        )
    }

    const registrationDate = user.createdAt.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })

    ctx.callbackQuery.message?.editText(`
Здравствуйте ${user.firstName || user.username}.
Дата регистрации: ${registrationDate}.
У вас ещё нет заказов, перейдите в раздел с товарами.
    `, {
        reply_markup: new InlineKeyboard()
            .text("Назад", "menu")
    })
}