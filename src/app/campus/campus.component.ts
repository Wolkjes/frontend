import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { LokaalService } from '../service/lookaal.service';
import { CookieService } from 'ngx-cookie-service';
import { Lokaal } from '../model/lokaal.model';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})


export class CampusComponent implements OnInit {

  private campus_id:number;
  naam:string;
  lokalen:Lokaal[];

  addSensorIsShown: boolean = false;
  editSensorIsShown: boolean = false;
  deleteLokaalIsShown: boolean = false;
  editCampusIsShown: boolean = false;
  deleteCampusIsShown: boolean = false;
  changeTresholdsIsShown: boolean = false;

  constructor(private eventEmitterService: EventEmitterService, private lokaalService:LokaalService, private cookieService:CookieService) {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.naam = this.cookieService.get("activeCampusNaam");
    this.lokalen = [];
  }

  getAll(): void{
    this.lokaalService.getAll(this.campus_id).subscribe(data => this.lokalen = data);
  }

  ngOnInit() {
    this.getAll();
      if (this.eventEmitterService.subsVar==undefined) {
        this.eventEmitterService.subsVar = this.eventEmitterService.closeFunction.subscribe((name:string) => {
        this.close();
        }); 
      }
    }  
 
  // close all windows from another Component
  close() {
    this.addSensorIsShown = false;
    this.editSensorIsShown = false;
    this.deleteLokaalIsShown = false;
    this.editCampusIsShown = false;
    this.deleteCampusIsShown = false;
    this.changeTresholdsIsShown = false;
  }

  toggleShowAddSensor() {
    this.addSensorIsShown = ! this.addSensorIsShown;
  }

  toggleShowEditSensor() {
    this.editSensorIsShown = ! this.editSensorIsShown;
  }

  toggleDeleteLokaal() {
    this.deleteLokaalIsShown = ! this.deleteLokaalIsShown;
  }

  toggleEditCampus(){
    this.editCampusIsShown = ! this.editCampusIsShown;
  }

  toggleDeleteCampus(){
    this.deleteCampusIsShown = ! this.deleteCampusIsShown;
  }

  toggleChangeTresholds(){
    this.changeTresholdsIsShown = ! this.deleteCampusIsShown;
  }

  noA(e) {
    e.stopPropagation();
  }
}
