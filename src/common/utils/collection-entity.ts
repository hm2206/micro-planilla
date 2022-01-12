import { Collection } from "collect.js";
import { IPaginationMeta } from "nestjs-typeorm-paginate";

export interface ICollectionEntity {
  meta: IPaginationMeta
  items: any
}

export interface IParamCollection {
  meta: IPaginationMeta,
  items: any[]
}

export class PaginateCollection<T> implements ICollectionEntity {
  constructor(info: IParamCollection) {
    this.items = new Collection(info.items);
    this.meta = info.meta;
  }

  public items = new Collection<T>();
  public meta: IPaginationMeta;
}

export class CollectionGeneric<T> {
  constructor(items: T[]) {
    this.items = new Collection<T>(items);
  }

  public items = new Collection<T>();
}