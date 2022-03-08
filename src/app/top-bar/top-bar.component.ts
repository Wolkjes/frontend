import { Component, OnInit } from '@angular/core';
import { CampusService } from '../service/campus.service';
import { Campus } from '../model/campus.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from '../service/token-storage.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  decodedToken: any;
  token;

  activeCampus: string = "Campussen";
  onlyOneCampusAndUser: boolean = false;

  constructor(private tokenService: TokenStorageService, private campusService: CampusService, private cookieService: CookieService, private tokenStorage: TokenStorageService) {
    this.token = this.tokenService.getToken();
    if (this.token !== null) {
      this.decodedToken = jwt_decode(this.token);
    }
  }

  ngOnInit(): void {
    this.getCampuses();
  }

  campuses: Campus[] = [];

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  setCoockieCampus(campus: Campus) {
    this.setCookie("activeCampusId", campus.campus_id);
    this.setCookie("activeCampusNaam", campus.name)

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  getCampuses(): void {
    let check = false;
    this.campusService.getAll(this.decodedToken.persoon_id).subscribe(data => {
      this.campuses = data;

      for (let campus of this.campuses) {
        if (campus.campus_id === Number.parseFloat(this.cookieService.get("activeCampusId"))) {
          check = true;
        }
      }

      if (this.campuses.length === 0) {
        this.setCookie("activeCampusId", 0);
        this.setCookie("activeCampusNaam", "PLS select a campus");
      } else if (!check) {
        this.setCookie("activeCampusId", this.campuses[0].campus_id);
        this.setCookie("activeCampusNaam", this.campuses[0].name);
      }
      this.activeCampus = this.cookieService.get("activeCampusNaam");
      //If there is only one campus set boolean to hide dropdown for user

      if (this.campuses.length === 1) {
        if (this.decodedToken.role === 'user') {
          this.onlyOneCampusAndUser = true
        }
      }
    });
  }

  addCampusIsShown: boolean = false;

  toggleShowAddCampus() {
    this.addCampusIsShown = !this.addCampusIsShown;
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.href = '/login';
  }
}
