import { IBill } from 'app/shared/model/bill.model';
import { IPayed } from 'app/shared/model/payed.model';

export interface IPrintInfo {
  id?: number;
  baseInfo?: string;
  bill?: IBill;
  payed?: IPayed;
}

export const defaultValue: Readonly<IPrintInfo> = {};
