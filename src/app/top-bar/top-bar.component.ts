import { Component, OnInit } from '@angular/core';
import { CampusService} from '../service/campus.service';
import { Campus } from '../model/campus.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Observable, timer} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from '../service/token-storage.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  decodedToken:any;
  token;

  activeCampus:string = "Campussen";

  constructor(private tokenService:TokenStorageService, private campusService: CampusService, private cookieService: CookieService, private tokenStorage: TokenStorageService) {
    this.token = this.tokenService.getToken();
    if (this.token !== null){
      this.decodedToken = jwt_decode(this.token);
    }
  }

  ngOnInit(): void {
    this.getCampuses();
    this.activeCampus = this.cookieService.get("activeCampusNaam");
  }

  campuses: Campus[] = [];

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  setCoockieCampus(campus:Campus){
    this.setCookie("activeCampusId", campus.campus_id);
    this.setCookie("activeCampusNaam", campus.name)

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  getCampuses(): void{
      this.campusService.getAll().subscribe(data => this.campuses = data);
  }

  addCampusIsShown: boolean = false;

  toggleShowAddCampus() {
    this.addCampusIsShown = ! this.addCampusIsShown;
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.href = '/login';
  }
}
