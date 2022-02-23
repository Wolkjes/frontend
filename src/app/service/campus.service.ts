import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private baseUrl = 'http://localhost:8080/wolkjes/campus/';

  constructor(private http: HttpClient) {

   }

  getAll(): Observable<Campus[]> {
    return this.http.get<Campus[]>(this.baseUrl);
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