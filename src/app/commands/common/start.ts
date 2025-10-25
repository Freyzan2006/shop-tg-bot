import { MyContext } from "app/types.js";
import { userService } from "../di";
import { keyboard } from "app/keyboards/menu";



export const startCommand = async (ctx: MyContext) => {
  if (!ctx.from) {
    return ctx.reply("User info is not available");
  }

  const { id, first_name, username } = ctx.from;

  try {
    
    
    const existingUser = await userService.findById(id);
    
    if (existingUser) {
      return ctx.reply("Вы уже зарегистрированы !", { reply_markup: keyboard });
    }
    
    await userService.create(id, first_name, username);

    return ctx.reply("Вы успешно зарегистрированы !", { reply_markup: keyboard });
  } catch (err) {
    console.error(err);
    console.error("Ошибка при регистрации пользователя");
    ctx.reply("Произошла ошибка, попробуйте позже")
  }
}