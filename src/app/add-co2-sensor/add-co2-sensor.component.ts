import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-co2-sensor',
  templateUrl: './add-co2-sensor.component.html',
  styleUrls: ['./add-co2-sensor.component.css']
})
export class AddCo2SensorComponent implements OnInit {

  sensors: Sensor[] = [];
  newSensor: FormGroup;
  private campus_id:number;

  constructor(private eventEmitterService: EventEmitterService, private sensorService: SensorService, fb: FormBuilder, private cookieService: CookieService) {
    this.newSensor = fb.group({
      sensorNaam: [""],
      choose_sensor: [""],
    });
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
  }

  ngOnInit(): void {
    this.getSensors();
}

  addSensor(){
    var lokaal = this.newSensor.value.sensorNaam;
    var newS = false;
    this.sensorService.update(this.newSensor.value.choose_sensor, {
      campus_id: this.campus_id,
      lokaal: lokaal,
      new: newS,
    }) 
  }

  getSensors(): void{
    this.sensorService.getAll().subscribe(data => this.sensors = data);
}



  close(){
    this.eventEmitterService.close();
  }

}
