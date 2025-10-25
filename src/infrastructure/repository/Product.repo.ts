import { Repository } from "."


export interface IProductModel {
    id: number,
    title: string,
    description: string,
    price: number
}

const products: IProductModel[] = [
    {
        id: 1,
        title: "Товар 1",
        description: "Описание товара 1",
        price: 100
    },
    {
        id: 2,
        title: "Товар 2",
        description: "Описание товара 2",
        price: 200
    }
];

class ProductRepository extends Repository<IProductModel> {
    private data: IProductModel[] = products
    findById(id: number): Promise<IProductModel | null> {
        return Promise.resolve(this.data.find(product => product.id === id) || null)
    }
    create(data: Partial<IProductModel>): Promise<IProductModel> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<IProductModel>): Promise<IProductModel | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<IProductModel[]> {
        return Promise.resolve(this.data)
    }
}

export {
    ProductRepository
}