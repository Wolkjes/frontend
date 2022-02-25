import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';
import { Lokaal } from '../model/lokaal.model';
import { json } from 'body-parser';

@Injectable({
  providedIn: 'root'
})
export class GrafanaService {

  private baseUrl = 'http://188.166.43.149:3000/api/dashboards/db';

  constructor(private http: HttpClient) {}

  get(campus_id: number): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.baseUrl}/${campus_id}`);
  }

  create(data: Campus) {
    var jsonData = {
        "dashboard": {
          "id": null,
          "uid": data.campus_id,
          "title": data.name,
          "tags": [ "templated" ],
          "timezone": "browser",
          "schemaVersion": 16,
          "version": 0,
          "refresh": "25s"
        }
      }

    let headers = new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        "Authorization": "Bearer eyJrIjoiNUp1dDZKMjFZcE9ZWk5hclRDN29HQVh2MzBJM0xOR04iLCJuIjoiS2V5IiwiaWQiOjF9",
    });
    let options = { headers: headers };

    console.log(jsonData);

    return this.http.post(this.baseUrl, jsonData, options).subscribe(data => console.log(data));
  }

}