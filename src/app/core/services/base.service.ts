import { HttpParams } from '@angular/common/http';

export class BaseService {
  /**
   * Prepares HttpParams dynamically from an object
   * @param params Object containing key-value pairs for query parameters
   * @returns HttpParams instance
   */
  protected prepareHttpParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params)?.forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value?.forEach((val) => {
              httpParams = httpParams.append(key, val);
            });
          } else {
            httpParams = httpParams.set(key, value);
          }
        }
      });
    }
    return httpParams;
  } 

  protected prepareFormData(body: any) {
    // debugger;
    const formData = new FormData();
    if (body) {
      Object.keys(body)?.forEach((key: string) => {
        const value = body[key];
        if (Array.isArray(value)) {
          value?.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value);
        }
      });
    }
    return formData;
  }
}
