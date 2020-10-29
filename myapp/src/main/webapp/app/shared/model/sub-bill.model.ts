import { IRoomType } from 'app/shared/model/room-type.model';

export interface ISubBill {
  id?: number;
  number?: number;
  total?: number;
  good?: IRoomType;
}

export const defaultValue: Readonly<ISubBill> = {};
