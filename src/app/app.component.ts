import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './service/token-storage.service';
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  decodedToken:any;
  token;
  isLoggedIn = false;
  constructor(private tokenService:TokenStorageService, private tokenStorageService: TokenStorageService) {
    this.token = this.tokenService.getToken();
    if (this.token !== null){
      this.decodedToken = jwt_decode(this.token);
    }   }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '/login';
  }
  title = 'wolkjes';
}