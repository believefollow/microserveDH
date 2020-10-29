export interface IRoomType {
  id?: number;
  number?: number;
  feature?: string;
  price?: number;
}

export const defaultValue: Readonly<IRoomType> = {};
