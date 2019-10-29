import { Moment } from 'moment';
import { ICustomAttribute } from 'app/shared/model/custom-attribute.model';
import { ITemplate } from 'app/shared/model/template.model';
import { ICompany } from 'app/shared/model/company.model';
import { IPerson } from 'app/shared/model/person.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IOffer {
  id?: number;
  caption?: string;
  language?: Language;
  offerDate?: Moment;
  customAttributes?: ICustomAttribute[];
  template?: ITemplate;
  customers?: ICompany[];
  customerManagers?: IPerson[];
  vendors?: ICompany[];
  vendorManagers?: IPerson[];
}

export const defaultValue: Readonly<IOffer> = {};
