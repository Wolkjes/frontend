import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { GrafanaService } from '../service/grafana.service';
import { LokaalService } from '../service/lookaal.service';
import { SensorService } from '../service/sensor.service';

@Component({
  selector: 'app-edit-co2-sensor',
  templateUrl: './edit-co2-sensor.component.html',
  styleUrls: ['./edit-co2-sensor.component.css'],
})
export class EditCo2SensorComponent implements OnInit {

  @Input() message:number;
  @Input() lokaal_naam:string;
  lokaal_id:number;
  campus_naam:string;
  sensor:Sensor[];
  errors:string[] = [];
  actieveCampusId:number;

  private campus_id:number;

  constructor(private grafanaService:GrafanaService, private cookieService:CookieService, private eventEmitterService: EventEmitterService, private sensorService:SensorService, private lokaalService:LokaalService) { }

  ngOnInit(): void {
    this.lokaal_id = this.message;
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.campus_naam = this.cookieService.get("activeCampusNaam");
  }

  editSensor(){
    this.errors = [];
    var naam = (<HTMLInputElement>document.getElementById("name_sensor")).value;
    if  (naam.trim() !== ""){
      this.sensorService.getSensorId(this.lokaal_id).subscribe(datasensor => {
        this.sensor = datasensor;
  
        var data = {
          "lokaal_naam" : naam,
          "sensor_id": this.sensor[0].sensor_id,
          "campus_naam": this.campus_naam,
          "oud_lokaal":this.lokaal_naam
        }
        this.lokaalService.update(this.lokaal_id, data)
  
        this.grafanaService.updateLokaal(this.campus_id,naam, this.lokaal_naam, this.sensor[0].sensor_id)
      });
  
  
      setTimeout(() => {
        window.location.reload();
      },100)
    }else{
      this.errors.push("Lokaal kan niet leeg zijn");
    }
  }

  close(){
    this.eventEmitterService.close();
  }
}
