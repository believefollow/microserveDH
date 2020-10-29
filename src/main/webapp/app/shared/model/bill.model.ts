import { ICheckIn } from 'app/shared/model/check-in.model';
import { Source } from 'app/shared/model/enumerations/source.model';

export interface IBill {
  id?: number;
  balance?: number;
  isPayed?: boolean;
  source?: Source;
  checkIn?: ICheckIn;
}

export const defaultValue: Readonly<IBill> = {
  isPayed: false,
};
