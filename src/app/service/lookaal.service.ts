import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';
import { Lokaal } from '../model/lokaal.model';

@Injectable({
  providedIn: 'root'
})
export class LokaalService {

  private baseUrl = 'http://localhost:8080/wolkjes/lokaal/';

  constructor(private http: HttpClient) {

   }

  getAll(campus_id: number): Observable<Lokaal[]> {
    return this.http.get<Lokaal[]>(this.baseUrl + "/" + campus_id);
  }

  get(campus_id: number): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.baseUrl}/${campus_id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(campus_id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${campus_id}`, data);
  }

  delete(campus_id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${campus_id}`);
  }


}