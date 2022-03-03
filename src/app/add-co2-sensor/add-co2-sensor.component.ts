import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GrafanaService } from '../service/grafana.service';

@Component({
  selector: 'app-add-co2-sensor',
  templateUrl: './add-co2-sensor.component.html',
  styleUrls: ['./add-co2-sensor.component.css']
})
export class AddCo2SensorComponent implements OnInit {

  private sensor:Sensor[];
  errors:string[] = [];
  sensors: Sensor[] = [];
  newSensor = new FormGroup({
    sensorNaam: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ]),
    choose_sensor: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ])
  });
  private campus_id:number;
  private campus_naam:string;

  constructor(private eventEmitterService: EventEmitterService, private sensorService: SensorService, fb: FormBuilder, private cookieService: CookieService, private grafanaService:GrafanaService) {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.campus_naam = this.cookieService.get("activeCampusNaam");
  }

  ngOnInit(): void {
    this.getSensors();
  }

  get sensorNaam(){
    return this.newSensor.get('sensorNaam');
  }

  get choose_sensor(){
    return this.newSensor.get('choose_sensor');
  }

  addSensor(){
    this.errors = [];
    if (this.sensorNaam?.invalid){
      this.errors.push("Lokaal kan niet leeg zijn!");
    }
    if (this.choose_sensor?.invalid){
      this.errors.push("Selecteer een sensor alstublieft!");
    }

    if (this.errors.length === 0){
      var lokaal = this.newSensor.value.sensorNaam;
      var newS = false;
      this.sensorService.update(this.newSensor.value.choose_sensor, {
        campus_id: this.campus_id,
        lokaal: lokaal,
        new: newS,
      })

      setTimeout(() => {
        this.sensorService.get(this.newSensor.value.choose_sensor).subscribe(data => {
          this.sensor = data;
          this.update(data);
        });
      }, 200);
    }
  }

  update(data:any): void{
    this.sensor = data;
    this.grafanaService.addPanel(data[0], this.campus_id, this.campus_naam, this.newSensor.value.sensorNaam)

    setTimeout(() => {
      window.location.reload();
    }, 800);
  }

  getSensors(): void{
    this.sensorService.getAll().subscribe(data => this.sensors = data);
}



  close(){
    this.eventEmitterService.close();
  }

}
