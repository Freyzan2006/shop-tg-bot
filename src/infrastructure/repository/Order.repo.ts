import { IOrderModel } from "domain/models/Order";
import { Repository } from ".";


export class OrderRepository extends Repository<IOrderModel> {
    public findById(id: number): Promise<IOrderModel | null> {
        throw new Error("Method not implemented.");
    }
    public create(data: IOrderModel): Promise<IOrderModel> {
        if (!data) {
            throw new Error("Data is empty");
        }
        data.save();
        return Promise.resolve(data);
    }
    public update(id: string, data: Partial<IOrderModel>): Promise<IOrderModel | null> {
        throw new Error("Method not implemented.");
    }
    public delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public findAll(): Promise<IOrderModel[]> {
        throw new Error("Method not implemented.");
    }
} 