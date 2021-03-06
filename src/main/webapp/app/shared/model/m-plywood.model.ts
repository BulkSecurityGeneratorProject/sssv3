import { Moment } from 'moment';
import { ITPlywood } from 'app/shared/model//t-plywood.model';
import { IUser } from 'app/shared/model/user.model';
import { IMPlywoodCategory } from 'app/shared/model//m-plywood-category.model';

export const enum Status {
  ACT = 'ACT',
  DIS = 'DIS',
  DEL = 'DEL'
}

export interface IMPlywood {
  id?: number;
  hargaBeli?: number;
  qty?: number;
  qtyProduksi?: number;
  status?: Status;
  createdOn?: Moment;
  tplywoods?: ITPlywood[];
  createdby?: IUser;
  plywoodcategory?: IMPlywoodCategory;
}

export const defaultValue: Readonly<IMPlywood> = {};
