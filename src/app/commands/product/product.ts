import { MyContext } from "app/types";
import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { productService } from "../di";



export const productsCommand = async (ctx: CallbackQueryContext<MyContext>) => {
    ctx.answerCallbackQuery();

    const productsList = await productService.getList()
    const products = productsList.reduce((acc, cur) => {
        return (
            acc +
            `- Товар: ${cur.title}\nОписание: ${cur.description}\nЦена: ${cur.price}\n\n`
        )
    }, "")
    
    const messageText = `Все товаров:\n\n${products}`;

    const keyboardButtonRows = productsList.map((product) => 
        InlineKeyboard.text(product.title, `buyProduct-${product.id}`));
    
    const keyboard = InlineKeyboard.from([
        keyboardButtonRows,
        [InlineKeyboard.text("Назад", "menu")]
    ])
    

    ctx.callbackQuery.message?.editText(messageText, {
        reply_markup: keyboard
    });
}