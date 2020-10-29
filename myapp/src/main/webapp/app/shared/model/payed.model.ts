import { Source } from 'app/shared/model/enumerations/source.model';

export interface IPayed {
  id?: number;
  source?: Source;
  payId?: string;
  amount?: number;
}

export const defaultValue: Readonly<IPayed> = {};
