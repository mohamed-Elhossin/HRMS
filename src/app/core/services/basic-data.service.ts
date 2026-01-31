import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api';
import { environment } from '../../../environments/environment';
import { apisList } from '../constants/apis';

@Injectable({
  providedIn: 'root'
})
export class BasicDataService extends BaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getBasicData(dataType: keyof typeof apisList.BasicData, param?: { PageSize?: number; PageNo?: number }): Observable<IApiResponse> {
    const defaultParam = { PageSize: 0, PageNo: 0 };
    const params = this.prepareHttpParams(param ? param : defaultParam);
    return this.http.get<IApiResponse>(`${environment.apiUrl}${apisList.BasicData[dataType]}`, { params });
  }

}
