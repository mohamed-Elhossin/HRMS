import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apisList } from '../constants/apis';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createCompany(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}${apisList.Companies.createCompany}`, formData);
  }

  getCompanies(body: { id?: string | null; name?: string | null }): Observable<any> {
    return this.http.post(`${this.baseUrl}${apisList.Companies.getCompanies}`, body);
  }
}
