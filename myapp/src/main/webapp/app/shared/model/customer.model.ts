import { Sex } from 'app/shared/model/enumerations/sex.model';

export interface ICustomer {
  id?: number;
  name?: string;
  sex?: Sex;
  age?: number;
  address?: string;
}

export const defaultValue: Readonly<ICustomer> = {};
