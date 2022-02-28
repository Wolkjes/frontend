import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GrafanaService } from '../service/grafana.service';
import { Campus } from '../model/campus.model';

@Component({
  selector: 'app-add-co2-sensor',
  templateUrl: './add-co2-sensor.component.html',
  styleUrls: ['./add-co2-sensor.component.css']
})
export class AddCo2SensorComponent implements OnInit {

  private sensor:Sensor[];

  sensors: Sensor[] = [];
  newSensor: FormGroup;
  private campus_id:number;
  private campus_naam:string;

  constructor(private eventEmitterService: EventEmitterService, private sensorService: SensorService, fb: FormBuilder, private cookieService: CookieService, private grafanaService:GrafanaService) {
    this.newSensor = fb.group({
      sensorNaam: [""],
      choose_sensor: [""],
    });
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.campus_naam = this.cookieService.get("activeCampusNaam");
  }

  ngOnInit(): void {
    this.getSensors();
}

  addSensor(){
    var lokaal = this.newSensor.value.sensorNaam;
    var newS = false;
    var data:any;
    this.sensorService.update(this.newSensor.value.choose_sensor, {
      campus_id: this.campus_id,
      lokaal: lokaal,
      new: newS,
    })

    this.sensorService.get(this.newSensor.value.choose_sensor).subscribe(data => {
      this.sensor = data;
      this.update(data);
    });
  }

  update(data:any): void{
    this.sensor = data;
    console.log(this.sensor);
    this.grafanaService.addPanel(this.sensor[0], this.campus_id, this.campus_naam, this.newSensor.value.sensorNaam)

    window.location.reload;
  }

  getSensors(): void{
    this.sensorService.getAll().subscribe(data => this.sensors = data);
}



  close(){
    this.eventEmitterService.close();
  }

}
