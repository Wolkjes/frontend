import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class InfluxService {

    private baseUrl = 'http://localhost:8080/wolkjes/inlfux';

    constructor(private http: HttpClient) {

    }

    getCSV(campus_naam: any, lokaal_naam: any) {
        return this.http.get(this.baseUrl + "/" + campus_naam + "/" + lokaal_naam);
    }


}