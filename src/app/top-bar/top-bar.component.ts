import { Component, OnInit } from '@angular/core';
import { CampusService} from '../service/campus.service';
import { Campus } from '../model/campus.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Observable, timer} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  private cookieValue:string = "";
  activeCampus:string = "Campussen";

  constructor(private campusService: CampusService, private cookieService: CookieService ,
    ) {
  }

  ngOnInit(): void {
    this.getCampuses();
    this.activeCampus = this.cookieService.get("activeCampusNaam");
  }

  campuses: Campus[] = [];

  setCoockieCampus(campus:Campus){
    this.cookieService.set('activeCampusId', campus.campus_id.toString());
    this.cookieService.set('activeCampusNaam', campus.name.toString());
    window.location.reload();
  }

  getCampuses(): void{
      this.campusService.getAll().subscribe(data => this.campuses = data);
  }

  addCampusIsShown: boolean = false;

  toggleShowAddCampus() {
    this.addCampusIsShown = ! this.addCampusIsShown;
  }
}
