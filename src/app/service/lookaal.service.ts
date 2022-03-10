import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';
import { Lokaal } from '../model/lokaal.model';
import { environment } from 'src/environments/environment';
var base = environment.BASE;
@Injectable({
  providedIn: 'root'
})
export class LokaalService {

  private baseUrl = 'http://' + base + ':8080/wolkjes/lokaal';

  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": 'YOUR URL HERE',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Expose-Headers": "Set-Cookie",
    "Access-Control-Allow-Headers": "Content-Type, x-xsrf-token, X-Requested-With, Accept, Expires, Last-Modified, Cache-Control",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Authorization": "Bearer eyJrIjoiNUp1dDZKMjFZcE9ZWk5hclRDN29HQVh2MzBJM0xOR04iLCJuIjoiS2V5IiwiaWQiOjF9",
  });

  private options;

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

  update(lokaal_id: any, data: any){
    return this.http.put(`${this.baseUrl}/${lokaal_id}`, data).subscribe();
  }

  delete(lokaal_id: any, campus_naam:string, lokaal_naam:any){
    this. options = { 
      headers: this.headers,
      body:{"campus_naam":campus_naam, "lokaal_naam": lokaal_naam}
     };
    return this.http.request("DELETE", `${this.baseUrl}/${lokaal_id}`, this.options);
  }


}
