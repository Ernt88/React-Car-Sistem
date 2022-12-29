export default interface IRepository<Model> {
    list(): Model[];

    get(id: string): Model;

    add(entity: Model): Model;

    update(entity: Model): Model;

    delete(id: string): void;
}