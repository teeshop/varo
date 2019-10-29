import { IOffer } from 'app/shared/model/offer.model';

export interface ICompany {
  id?: number;
  name?: string;
  street?: string;
  number?: string;
  postalCode?: string;
  city?: string;
  receivedOffers?: IOffer[];
  sentOffers?: IOffer[];
}

export const defaultValue: Readonly<ICompany> = {};
