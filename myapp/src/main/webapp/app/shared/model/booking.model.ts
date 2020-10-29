import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { IPayed } from 'app/shared/model/payed.model';

export interface IBooking {
  id?: number;
  arrivedTime?: string;
  leavingtime?: string;
  bookingTime?: string;
  customer?: ICustomer;
  payed?: IPayed;
}

export const defaultValue: Readonly<IBooking> = {};
