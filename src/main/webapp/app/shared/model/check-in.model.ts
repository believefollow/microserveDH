import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { IBill } from 'app/shared/model/bill.model';
import { IRoom } from 'app/shared/model/room.model';
import { CheckInStatus } from 'app/shared/model/enumerations/check-in-status.model';

export interface ICheckIn {
  id?: number;
  startTime?: string;
  endTime?: string;
  bookTime?: string;
  status?: CheckInStatus;
  customers?: ICustomer[];
  bills?: IBill[];
  rooms?: IRoom[];
}

export const defaultValue: Readonly<ICheckIn> = {};
