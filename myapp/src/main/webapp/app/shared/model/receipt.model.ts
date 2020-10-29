export interface IReceipt {
  id?: number;
  number?: string;
  receipted?: boolean;
}

export const defaultValue: Readonly<IReceipt> = {
  receipted: false,
};
