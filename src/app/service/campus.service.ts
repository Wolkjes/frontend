import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Campus } from '../model/campus.model';
var base = process.env['BASE'];

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    
  private options;

  private baseUrl = "http://" + base + ":8080/wolkjes/campus";
  private campus:Campus;

  constructor(private http: HttpClient) {
   }

  getAll(persoon_id:any): Observable<Campus[]> {
    return this.http.get<Campus[]>(this.baseUrl+"/persoon/"+persoon_id);
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
    var options = {headers: this.headers}
    return this.http.post<Campus[]>(this.baseUrl+"/", data, options);
  }

  update(campus_id: number, data: any): Observable<any>{
    this.http.put(this.baseUrl+"/"+campus_id, {name:data}, this.options).subscribe(data => {
      console.log(data);
    });
    return of("ok");
  }

  delete(campus_id: any, campus_naam:any):any{    
    this.options = { 
      headers: this.headers,
      body:{"campus_naam": campus_naam}
     };
    return this.http.request("DELETE", this.baseUrl+"/"+campus_id, this.options).subscribe();
  }


}