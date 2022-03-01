import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";

@Injectable({
    providedIn: 'root'
  })
  
export class UserService {
    private baseURL = "http://localhost:8080/wolkjes/user"
    private user:User;

    constructor(private http: HttpClient){
        
    }

    create(data: any): Observable<User[]>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = { headers: headers };
        return this.http.post<User[]>(this.baseURL+"/", data, options);
    }
}