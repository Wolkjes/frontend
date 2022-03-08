import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";

@Injectable({
    providedIn: 'root'
  })
  
export class UserService {
    private baseURL = "http://localhost:8080/wolkjes/user"
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private options;
    constructor(private http: HttpClient){
        
    }

    create(data: any): Observable<User[]>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = { headers: headers };
        return this.http.post<User[]>(this.baseURL+"/", data, options);
    }

    getAllUsers(){
        return this.http.get<User[]>(this.baseURL + "/");
    }
    getAll(data: any, persoon_id:number): Observable<User[]> {
        var body = {
            persoon_id: persoon_id
        }
        return this.http.get<User[]>(this.baseURL + "/" + data + "/" + persoon_id);
    }

    update(data:any, user_id:number){
        return this.http.put<User[]>(this.baseURL + "/"+user_id, data).subscribe();  
    }

    delete(data:any):any{
        this.options = {
            headers: this.headers,
            body:data
        };
        return this.http.request("DELETE", this.baseURL+"/", this.options).subscribe();    
    }

    addToCampus(campus_id:number, persoon_id:number){
        return this.http.put<User[]>(this.baseURL + "/tussentabel/" + campus_id, {persoon_id:persoon_id}); 
    }

    // emails(): Observable<User[]> {
    //     return this.http.get<User[]>(this.baseURL+"/emails");
    // }
}