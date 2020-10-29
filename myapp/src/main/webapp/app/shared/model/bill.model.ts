import { IReceipt } from 'app/shared/model/receipt.model';
import { ISubBill } from 'app/shared/model/sub-bill.model';
import { IPayed } from 'app/shared/model/payed.model';

export interface IBill {
  id?: number;
  balance?: number;
  finished?: boolean;
  receipt?: IReceipt;
  subBill?: ISubBill;
  payed?: IPayed;
}

export const defaultValue: Readonly<IBill> = {
  finished: false,
};
