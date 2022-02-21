import { Component, OnInit } from '@angular/core';
import { CampusComponent } from '../campus/campus.component';

@Component({
  selector: 'app-edit-co2-sensor',
  templateUrl: './edit-co2-sensor.component.html',
  styleUrls: ['./edit-co2-sensor.component.css'],
  template: `<button (click)="CampusComponent.toggleShowEditSensor();
             <com1 #closeEdit></com1>`
})
export class EditCo2SensorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
