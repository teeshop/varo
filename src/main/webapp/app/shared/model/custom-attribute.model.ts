import { IOffer } from 'app/shared/model/offer.model';

export interface ICustomAttribute {
  id?: number;
  key?: string;
  value?: string;
  offer?: IOffer;
}

export const defaultValue: Readonly<ICustomAttribute> = {};
