import { Moment } from 'moment';
import { IOffer } from 'app/shared/model/offer.model';
import { IUser } from 'app/shared/model/user.model';

export interface IDocument {
  id?: number;
  createdAt?: Moment;
  contentContentType?: string;
  content?: any;
  offer?: IOffer;
  createdBy?: IUser;
}

export const defaultValue: Readonly<IDocument> = {};
