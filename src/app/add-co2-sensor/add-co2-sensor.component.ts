import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-add-co2-sensor',
  templateUrl: './add-co2-sensor.component.html',
  styleUrls: ['./add-co2-sensor.component.css']
})
export class AddCo2SensorComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) {
    
  }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }

}
