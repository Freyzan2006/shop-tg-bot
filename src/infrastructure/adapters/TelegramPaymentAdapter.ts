// app/modules/payments/adapters/TelegramPaymentAdapter.ts
import { MyContext } from "app/types";
import { IProductModel } from "infrastructure/repository/Product.repo";


export class TelegramPaymentAdapter {
  constructor(private ctx: MyContext, private providerToken: string) {}

  async sendInvoice(product: IProductModel): Promise<void> {
    const chatId = this.ctx.chat?.id;
    if (!chatId) throw new Error("Chat ID not found");

    const providerInvoiceData = {
        receipt: {
            items: [
                {
                    description: product.description,
                    quantity: 1,
                    amount: {
                        value: `${product.price}.00`,
                        currency: "RUB"
                    },
                    vat_code: 1,
                }
            ]
        }
    }

    await this.ctx.api.sendInvoice(
      chatId,
      product.title,
      product.description,
      product.id.toString(),
      "RUB",
      [
        {
          label: product.title,
          amount: product.price * 100,
        },
      ], { 
        provider_token: this.providerToken,
        need_email: true,
        provider_data: JSON.stringify(providerInvoiceData)
      }
    );
  }
}
