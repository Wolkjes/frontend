import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-single-sensor',
  templateUrl: './single-sensor.component.html',
  styleUrls: ['./single-sensor.component.css']
})
export class SingleSensorComponent implements OnInit {
  sensor:Sensor[] = []
  id:any;
  panel_id:number;
  campus_id:number;
  campus_naam:string;
  imgPath:string  = "http://188.166.43.149:3000/d-solo/17/campus-proximus?orgId=1&theme=light&panelId=1&refresh=4s";
  safeSrc: SafeResourceUrl = "";

<<<<<<< HEAD
  deleteSensorIsShown: boolean = false;

  constructor(private eventEmitterService: EventEmitterService, private sensorService:SensorService, private route: ActivatedRoute, private cookieService: CookieService, private sanitizer: DomSanitizer) {
=======
  constructor(private sensorService:SensorService, private route: ActivatedRoute, private cookieService: CookieService, private sanitizer: DomSanitizer) {
    console.log(document.cookie)
>>>>>>> eb6c843 (cookies fix)
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.campus_naam = this.cookieService.get("activeCampusNaam");
    this.campus_naam = this.campus_naam.replace(" ", "-");
    this.campus_naam = this.campus_naam.toLocaleLowerCase();
    this.route.params.subscribe(data => {
      this.id = data['sensor_id']
    });

    this.sensorService.get(this.id).subscribe(data => {
      this.sensor = data;
      this.update(data);
    });

  
    }

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.closeFunction.subscribe((name:string) => {
      this.toggleDeleteSensor();
      }); 
  }
  }

  update(data:any): void{
    this.sensor = data;
    console.log(this.sensor[0])
    console.log(this.imgPath)
    this.panel_id = this.sensor[0].id
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("http://188.166.43.149:3000/d-solo/" + this.campus_id +"/" + this.campus_naam + "?orgId=1&theme=light&panelId=" + this.panel_id + "&refresh=4s");
  }

  toggleDeleteSensor(){
    this.deleteSensorIsShown = ! this.deleteSensorIsShown;
  }

}
