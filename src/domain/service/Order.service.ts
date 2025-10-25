import { IOrderModel, OrderModel } from "domain/models/Order"
import { Repository } from "infrastructure/repository"



interface IOrderService {
    createOrder(userId: number, productId: number, price: number): Promise<IOrderModel | null>
}

class OrderService implements IOrderService {
    constructor(private repository: Repository<IOrderModel>) {}

    public async createOrder(
        userId: number, productId: number, 
        price: number
    ): Promise<IOrderModel | null> {
        try {
            const newOrder = new OrderModel({
                userId,
                productId,
                price
            });

            return await this.repository.create(newOrder);
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export {
    OrderService,
    IOrderService
}