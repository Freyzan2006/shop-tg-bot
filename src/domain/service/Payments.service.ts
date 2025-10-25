// app/modules/payments/service/PaymentsService.ts

import { MyContext } from "app/types";
import { TelegramPaymentAdapter } from "infrastructure/adapters/TelegramPaymentAdapter";
import { IProductModel } from "infrastructure/repository/Product.repo";

interface IPaymentsService {
    createPayment(ctx: MyContext, product: IProductModel): Promise<void>;
}

class PaymentsService {
  private providerToken: string;

  constructor(providerToken: string) {
    this.providerToken = providerToken;
  }

  public async createPayment(ctx: MyContext, product: IProductModel): Promise<void> {
    const adapter = new TelegramPaymentAdapter(ctx, this.providerToken);
    await adapter.sendInvoice(product);
  }
}

export {
    PaymentsService,
    IPaymentsService
}