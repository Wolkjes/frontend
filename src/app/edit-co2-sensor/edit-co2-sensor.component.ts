import { Component, OnInit } from '@angular/core';
import { CampusComponent } from '../campus/campus.component';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-edit-co2-sensor',
  templateUrl: './edit-co2-sensor.component.html',
  styleUrls: ['./edit-co2-sensor.component.css'],
})
export class EditCo2SensorComponent implements OnInit {

  constructor( private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }
}
