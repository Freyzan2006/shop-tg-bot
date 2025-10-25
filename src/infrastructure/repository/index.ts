
interface IRepository<T> {
  findById(id: number): Promise<T | null>
  create(data: Partial<T>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T | null>
  delete(id: string): Promise<boolean>
  findAll(): Promise<T[]>
}

export abstract class Repository<T> implements IRepository<T> {
  /**
   * Получить запись по ID
   */
  public abstract findById(id: number): Promise<T | null>;

  /**
   * Создать новую запись
   */
  public abstract create(data: Partial<T>): Promise<T>;

  /**
   * Обновить запись по ID
   */
  public abstract update(id: string, data: Partial<T>): Promise<T | null>;

  /**
   * Удалить запись по ID
   */
  public abstract delete(id: string): Promise<boolean>;

  /**
   * Получить все записи
   */
  public abstract findAll(): Promise<T[]>;
}
