import { Component, OnInit } from '@angular/core';
import { CampusService} from '../service/campus.service';
import { Campus } from '../model/campus.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Observable, timer} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  private isConsented: boolean = false;

  constructor(private campusService: CampusService) {
    this.isConsented = this.getCookie(COOKIE_CONSENT) === '1';
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
}

private deleteCookie(name) {
    this.setCookie(name, '', -1);
}

private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

  campuses: Campus[] = [];

  getCampuses(): void{
      this.campusService.getAll().subscribe(data => this.campuses = data);
  }

  addCampusIsShown: boolean = false;

  ngOnInit(): void {
    this.getCampuses();
  }

  toggleShowAddCampus() {
    this.addCampusIsShown = ! this.addCampusIsShown;
  }
}
