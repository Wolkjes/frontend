import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  addSensorIsShown: boolean = false;
  editSensorIsShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
    }
    
  

  toggleShowAddSensor() {
    this.addSensorIsShown = ! this.addSensorIsShown;
  }

  toggleShowEditSensor() {
    this.editSensorIsShown = ! this.editSensorIsShown

  }
}
