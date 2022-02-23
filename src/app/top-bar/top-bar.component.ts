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

  constructor(private campusService: CampusService) {
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
