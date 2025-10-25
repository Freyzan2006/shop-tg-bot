import { Environment } from "app/config/environment";
import { IOrderService, OrderService } from "domain/service/Order.service";
import { IPaymentsService, PaymentsService } from "domain/service/Payments.service";
import { IProductService, ProductService } from "domain/service/Product.service";
import { IUserService, UserService } from "domain/service/User.service";
import { OrderRepository } from "infrastructure/repository/Order.repo";
import { ProductRepository } from "infrastructure/repository/Product.repo";


function factoryUserService(): IUserService {
    return new UserService();
}

export const userService = factoryUserService();


function factoryProductService(): IProductService {
    const repo = new ProductRepository();
    const svc = new ProductService(repo);
    return svc;
}

export const productService = factoryProductService();


function factoryPaymentsService(): IPaymentsService {
    const env = new Environment();
    const token = env.get("PAYMENT_TOKEN");
    return new PaymentsService(token);
}

export const paymentsService = factoryPaymentsService();

function factoryOrderService(): IOrderService {
    const repo = new OrderRepository();
    const svc = new OrderService(repo);
    return svc;
}

export const orderService = factoryOrderService();