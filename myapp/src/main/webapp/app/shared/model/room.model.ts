import { IRoomType } from 'app/shared/model/room-type.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IBill } from 'app/shared/model/bill.model';

export interface IRoom {
  id?: number;
  roomNumber?: number;
  memo?: string;
  roomType?: IRoomType;
  customer?: ICustomer;
  bill?: IBill;
}

export const defaultValue: Readonly<IRoom> = {};
