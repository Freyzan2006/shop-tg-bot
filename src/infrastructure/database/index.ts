import mongoose from "mongoose";


interface IDatabase {
  connectMongo(uri: string): Promise<void>;
}

class Database implements IDatabase {


  public async connectMongo(uri: string) {
    try {
      await mongoose.connect(uri);
    } catch (error) {
      throw new ReferenceError();
    }
  }
}

export {
    Database,
    IDatabase
}