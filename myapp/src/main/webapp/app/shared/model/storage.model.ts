export interface IStorage {
  id?: number;
  price?: number;
  remain?: number;
}

export const defaultValue: Readonly<IStorage> = {};
