import { IStorage } from 'app/shared/model/storage.model';

export interface ISubBillGood {
  id?: number;
  number?: number;
  total?: number;
  good?: IStorage;
}

export const defaultValue: Readonly<ISubBillGood> = {};
