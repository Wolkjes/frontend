import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Sensor } from '../model/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private baseUrl = "http://localhost:8080/wolkjes/sensor/";

  constructor(private http: HttpClient) {

   }

  getAll(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.baseUrl);
  }

  get(sensor_id: number): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.baseUrl}${sensor_id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(sensor_id: number, data: any){
    return this.http.put(this.baseUrl+sensor_id, data);
  }

  delete(sensor_id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${sensor_id}`);
  }


}