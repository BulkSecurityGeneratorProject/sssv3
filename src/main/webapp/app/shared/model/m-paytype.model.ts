import { Moment } from 'moment';
import { ITransaksi } from 'app/shared/model//transaksi.model';

export const enum Status {
  ACT = 'ACT',
  DIS = 'DIS',
  DEL = 'DEL'
}

export interface IMPaytype {
  id?: number;
  nama?: string;
  deskripsi?: any;
  status?: Status;
  createdOn?: Moment;
  transaksis?: ITransaksi[];
}

export const defaultValue: Readonly<IMPaytype> = {};
