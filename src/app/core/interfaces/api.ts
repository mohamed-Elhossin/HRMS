export interface IPaginationHeaders {
  PageNo: number;
  PageSize: number;
}

export interface IPagination {
  page_number: number;
  page_size: number;
  total_records: number;
  total_pages: number;
}

export interface IMessage {
  en: string;
  ar: string;
}

export interface IErrors {
  en: string;
  ar: string;
}

export interface IApiResponse {
  status: boolean;
  status_code: number;
  message: IMessage;
  data: any[];
  errors: IErrors | null;
  pagination: IPagination;
}
