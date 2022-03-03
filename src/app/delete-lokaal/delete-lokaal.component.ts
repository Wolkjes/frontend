import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { GrafanaService } from '../service/grafana.service';
import { LokaalService } from '../service/lookaal.service';
import { SensorService } from '../service/sensor.service';

@Component({
  selector: 'app-delete-lokaal',
  templateUrl: './delete-lokaal.component.html',
  styleUrls: ['./delete-lokaal.component.css']
})
export class DeleteLokaalComponent implements OnInit {

  @Input() message:number;
  @Input() lokaal_naam:string;
  lokaal_id:number;
  sensor:Sensor[];

  constructor(private sensorService:SensorService, private eventEmitterService: EventEmitterService, private lokaalService:LokaalService, private grafanaService:GrafanaService, private cookieService:CookieService) {

   }

  ngOnInit(): void {
    this.lokaal_id = this.message;
  }

  delete(){
    this.sensorService.getSensorId(this.lokaal_id).subscribe(data => {
      this.sensor = data;
      this.grafanaService.delete(this.sensor[0].sensor_id, Number.parseFloat(this.cookieService.get("activeCampusId")));
      this.lokaalService.delete(this.message, this.cookieService.get("activeCampusNaam"), this.lokaal_naam);
    });
  
      setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  close() {
    this.eventEmitterService.close(); 
  }

}
