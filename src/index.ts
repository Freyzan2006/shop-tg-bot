import { Application } from "app";

import { MyContext } from "app/types";
import { Environment } from "app/config/environment";
import { Database } from "infrastructure/database";
import { Bot } from "grammy";



async function main() {
  const env = new Environment();
  const bot = new Bot<MyContext>(
    env.get("BOT_TOKEN")
  );
  const db = new Database();
  const app = new Application(bot, db, env);

  await app.run();

}

await main();