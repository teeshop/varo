import { ICompany } from 'app/shared/model/company.model';
import { IOffer } from 'app/shared/model/offer.model';

export interface IPerson {
  id?: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  company?: ICompany;
  receivedOffers?: IOffer[];
  sentOffers?: IOffer[];
}

export const defaultValue: Readonly<IPerson> = {};
