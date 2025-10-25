import { Bot, GrammyError, HttpError } from "grammy";
import { MyContext } from "./types";

import { hydrate } from "@grammyjs/hydrate";
import { IEnvironment } from "app/config/environment";
import { IDatabase } from "infrastructure/database";
import { factoryCommonComposer, factoryProductComposer, factoryUserComposer } from "./commands";



interface IApplication {
  run() : Promise<void>
}

export class Application implements IApplication {
  private bot: Bot<MyContext>;
  private database: IDatabase;
  private env: IEnvironment;
  
  constructor(
    bot: Bot<MyContext>, 
    database: IDatabase,
    env: IEnvironment
  ) {
    this.bot = bot;
    this.database = database;
    this.env = env;
  }

  public async run() : Promise<void> {
    await this.registerMiddlewares();
    await this.registerCommands();
    await this.registerCatchers();
    
    const uri = this.env.get("MONGODB_URI");
    await this.database.connectMongo(uri);
    this.bot.start();
    console.log("🤖 Bot running & ✅ Mongo connected");
  }

  private async registerCommands() {  
    this.bot.on("pre_checkout_query", async (ctx) => {
      ctx.answerPreCheckoutQuery(true);
    })

    this.bot.use(
      factoryProductComposer(),
      factoryUserComposer(),
      factoryCommonComposer()
    );
  } 

  private async registerMiddlewares() {
    this.bot.use(hydrate());
  }

  private async registerCatchers() {
    this.bot.catch((err) => {
      const ctx = err.ctx;
      console.error(`Error while handling update ${ctx.update.update_id}:`);
      const e = err.error;
    
      if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
      } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
      } else {
        console.error('Unknown error:', e);
      }
    });
  }
}