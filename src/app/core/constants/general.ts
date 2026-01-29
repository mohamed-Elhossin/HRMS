import { IPaginationHeaders } from "../interfaces/api";


export const tokenKey = 'SYSTEM-TOKEN';
export const langKey = 'SYSTEM-LANGUAGE';
export const defaultPageLimit = 10;
export const defaultPaginationHeaders: IPaginationHeaders = {
  PageNo: 1,
  PageSize: 10
}

export const maxFiles = 5;
export const maxImageSize = 25 * 1024 * 1024;
