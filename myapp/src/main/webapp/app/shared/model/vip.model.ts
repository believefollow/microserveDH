import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IVip {
  id?: number;
  phone?: string;
  actived?: boolean;
  signInTime?: string;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IVip> = {
  actived: false,
};
