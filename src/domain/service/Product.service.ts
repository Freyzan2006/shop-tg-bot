import { Repository } from "infrastructure/repository";
import { IProductModel } from "infrastructure/repository/Product.repo";


interface IProductService {
    getList(): Promise<IProductModel[]>;
    findById(id: number): Promise<IProductModel | null>;
}

class ProductService {
    private repository: Repository<IProductModel>

    constructor(repository: Repository<IProductModel>) {
        this.repository = repository;
    }

    async getList(): Promise<IProductModel[]> {
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<IProductModel | null> {
        return await this.repository.findById(id);
    }
}

export {
    ProductService,
    IProductService
}