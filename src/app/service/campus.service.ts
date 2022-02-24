import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

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
  

  create(data: any){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    
    let options = { headers: headers };
    return this.http.post(this.baseUrl+"/", data, options).subscribe(data => {
      console.log(data);
    });
  }

  update(campus_id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${campus_id}`, data);
  }

  delete(campus_id: any):any{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
      console.log(campus_id)
    return this.http.delete<any>(this.baseUrl+"/"+campus_id).subscribe(data => console.log(data));
    
  }


}