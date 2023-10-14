export interface DepreciationItData {
  categoryName: string;
  data: Datum[];
  meta: Meta;
}

export interface Meta {
  total_wdvstart: number;
  total_before180Days: number;
  total_after180Days: number;
  total_total: number;
  total_depForYear: number;
  total_wdvend: number;
}

export interface Datum {
  rateOfDepn: number;
  wdvstart: number;
  before180Days: number;
  after180Days: number;
  total: number;
  depForYear: number;
  wdvend: number;
  productType: string;
}
