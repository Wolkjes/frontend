import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  addSensorIsShown: boolean = false;
  editSensorIsShown: boolean = false;
  deleteSensorIsShown: boolean = false;
  editCampusIsShown: boolean = false;
  deleteCampusIsShown: boolean = false;

  constructor(
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {

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
    this.deleteSensorIsShown = false;
    this.editCampusIsShown = false;
    this.deleteCampusIsShown = false;
  }

  toggleShowAddSensor() {
    this.addSensorIsShown = ! this.addSensorIsShown;
  }

  toggleShowEditSensor() {
    this.editSensorIsShown = ! this.editSensorIsShown;
  }

  toggleDeleteConfirmation() {
    this.deleteSensorIsShown = ! this.deleteSensorIsShown;
  }

  toggleEditCampus(){
    this.editCampusIsShown = ! this.editCampusIsShown;
  }

  toggleDeleteCampus(){
    this.deleteCampusIsShown = ! this.deleteCampusIsShown;
  }

  noA(e) {
    e.stopPropagation();
  }
}
