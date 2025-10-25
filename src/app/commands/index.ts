import { Composer } from "grammy";

import { MyContext } from "app/types";
import { startCommand } from "./common/start";
import { menuCommand } from "./common/menu";
import { productsCommand } from "./product/product";
import { profileCommand } from "./user/profile";
import { paymentsProductCommand, telegramSuccessPaymentHandler } from "./product/payments";





function factoryCommonComposer() : Composer<MyContext> {
    const composer = new Composer<MyContext>();
    composer.command('start', startCommand);
    composer.callbackQuery("menu", menuCommand);
    return composer;
}


function factoryUserComposer() : Composer<MyContext> {
    const composer = new Composer<MyContext>();

    composer.callbackQuery("profile", profileCommand);
    return composer;
}


function factoryProductComposer() : Composer<MyContext> {
    const composer = new Composer<MyContext>();

    composer.callbackQuery("products", productsCommand);
    composer.callbackQuery("\^buyProduct-[0-9]+", paymentsProductCommand);
    composer.on(":successful_payment", telegramSuccessPaymentHandler)


    return composer;
}

export {
    factoryCommonComposer,
    factoryUserComposer,
    factoryProductComposer
}