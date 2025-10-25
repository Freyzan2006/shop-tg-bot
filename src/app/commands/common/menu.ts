import { MyContext } from "app/types"
import { CallbackQueryContext, InlineKeyboard } from "grammy";



export const menuCommand = async (ctx: CallbackQueryContext<MyContext>) => {
    ctx.answerCallbackQuery();

    ctx.callbackQuery.message?.editText(
        "Меню магазина.\nОтсюда можете попасть в раздел с товарами и профилем:",
        {
            reply_markup: new InlineKeyboard()
                .text('Товары', 'products')
                .text('Профиль', 'profile')
        }
    )
}