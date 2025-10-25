import { MyContext } from "app/types";
import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { orderService, paymentsService, productService, userService } from "../di";
import { NotFoundUser } from "infrastructure/exception/NotFoundUser";

export const paymentsProductCommand = async (ctx: CallbackQueryContext<MyContext>) => {
  await ctx.answerCallbackQuery();


  const productId = ctx.callbackQuery.data.split("-")[1];
  const product = await productService.findById(parseInt(productId));

  if (!product) {
    return ctx.callbackQuery.message?.editText("Товар не найден");
  }

  try {
    await paymentsService.createPayment(ctx, product);
  } catch (err) {
    console.error(err);
    return ctx.callbackQuery.message?.editText("Ошибка при создании платежа");
  }

  await ctx.callbackQuery.message?.editText(
    `Вы выбрали товар: ${product.title}\nОписание: ${product.description}\nЦена: ${product.price}`,
    {
      reply_markup: new InlineKeyboard().text("Назад", "products"),
    }
  );
};

export const telegramSuccessPaymentHandler = async (ctx: MyContext) => {
  
  if (!ctx.message?.successful_payment || !ctx.from?.id) {
    return ctx.reply("Платеж не прошел");
  }

  const { invoice_payload, total_amount } = ctx.message?.successful_payment;
  const productId = parseInt(invoice_payload);
  const price = total_amount / 100;

  try {
    const userId = ctx.from.id;
    
    const user = await userService.findById(userId);
    if (!user) {
      throw new NotFoundUser();
    }

    await orderService.createOrder(user.id, productId, price);

    return ctx.reply("Платеж прошел успешно", {
      reply_markup: new InlineKeyboard().text("Назад", "products")
    });

  } catch (err) {
    console.error(err);
    return ctx.reply("Произошла ошибка, попробуйте позже");
  }
}
