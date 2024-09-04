import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.api.baseUrl;
  private formSettingsApi = environment.api.formSettings;
  private jsonUrl = '/settings/drop-down-select-value.json';
  private countryStateCityJsonUrl = '/settings/country-state-city.json';


  constructor(private http: HttpClient) { }

  // GET request
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params });
  }

  // POST request
  post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  // PUT request
  put<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  // DELETE request
  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { params });
  }

  // Specific API methods

  getDropdownValues(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.formSettingsApi.get}`);
  }
  getFormSettings(params: { [key: string]: string }): Observable<any> {
    let httpParams = new HttpParams();
    for (let key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get<any>(`${this.apiUrl}/form-settings`, { params: httpParams });
  }
  getMalaysiaData(): Observable<any> {
    return this.http.get<any>(this.countryStateCityJsonUrl);
  }

  saveDropdownValue(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.formSettingsApi.add}`, data);
  }
  // PUT request to update existing dropdown value by ID
  updateDropdownValue(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${this.formSettingsApi.update}/${id}`, data);
  }
  deleteDropdownValue(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${this.formSettingsApi.delete}/${id}`);
  }
  // Specific API methods for authentication

  // Fetch data with endpoint and params
  fetchData(endpoint: string, params: { [key: string]: any }): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<any>(`${this.apiUrl}${endpoint}`, { params: httpParams });
  }
  getDataWithAuth(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

}
