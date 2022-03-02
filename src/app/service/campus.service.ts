import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    
  private options = { headers: this.headers };

  private baseUrl = "http://localhost:8080/wolkjes/campus";
  private campus:Campus;

  constructor(private http: HttpClient) {
   }

  getAll(): Observable<Campus[]> {
    return this.http.get<Campus[]>(this.baseUrl);
  }

  get(campus_id: number): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.baseUrl}/${campus_id}`);
  }

  getLatest(): Campus {
    this.http.get<Campus>(this.baseUrl+"/latest").subscribe(data => {this.campus = data[0]});
    console.log(this.campus);
    return this.campus;
  }
  

  create(data: any): Observable<Campus[]>{
    return this.http.post<Campus[]>(this.baseUrl+"/", data, this.options);
  }

  update(campus_id: number, data: any){
    return this.http.put(this.baseUrl+"/"+campus_id, {name:data}, this.options).subscribe(data => {
      console.log(data);
    });
  }

  delete(campus_id: any):any{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
    return this.http.delete<any>(this.baseUrl+"/"+campus_id).subscribe(data => console.log(data));
    
  }


}