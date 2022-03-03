import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GrafanaService } from '../service/grafana.service';
import { Lokaal } from '../model/lokaal.model';
import { LokaalService } from '../service/lookaal.service';

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
<<<<<<< HEAD
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
=======
<<<<<<< HEAD
      Validators.required
=======
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
>>>>>>> 8b29646 (added validation on add user form)
>>>>>>> 8feb630 (added validation on add user form)
    ]),
    choose_sensor: new FormControl('', [
      Validators.required
    ])
  });
  private campus_id:number;
  private campus_naam:string;
  lokalen:Lokaal[];

  constructor(private lokaalService:LokaalService, private eventEmitterService: EventEmitterService, private sensorService: SensorService, fb: FormBuilder, private cookieService: CookieService, private grafanaService:GrafanaService) {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.campus_naam = this.cookieService.get("activeCampusNaam");
    this.lokalen = [];
  }

  ngOnInit(): void {
    this.getSensors();
    this.getAll();
  }

  get sensorNaam(){
    return this.newSensor.get('sensorNaam');
  }

  get choose_sensor(){
    return this.newSensor.get('choose_sensor');
  }

  getAll(): void{
    this.lokaalService.getAll(this.campus_id).subscribe(data => this.lokalen = data);
  }

  addSensor(){
    this.errors = [];

    for (let lokaal of this.lokalen){
      console.log(lokaal.lokaal_naam)
      if(lokaal.lokaal_naam === this.newSensor.value.sensorNaam){
        this.errors.push("Er bestaat al een lokaal met deze naam");
      }
    }

    if (this.sensorNaam?.invalid){
      this.errors.push("klas kan niet leeg zijn!");
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
