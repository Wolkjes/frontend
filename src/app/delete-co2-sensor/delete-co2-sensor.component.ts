import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-delete-co2-sensor',
  templateUrl: './delete-co2-sensor.component.html',
  styleUrls: ['./delete-co2-sensor.component.css']
})
export class DeleteCo2SensorComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  close() {
    this.eventEmitterService.close();
  }

}
