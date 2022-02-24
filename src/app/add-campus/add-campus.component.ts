import { Component, OnInit } from '@angular/core';
import { Campus } from '../model/campus.model';
import { EventEmitterService } from '../event-emitter.service';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CampusService } from '../service/campus.service';

@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit {

  newCampus: FormGroup;

  constructor(fb: FormBuilder,  private campusService: CampusService) {
    this.newCampus = fb.group({
      lokaal_campus: [""],
    });
   }

  addCampus(): void{
    var data = {
      name: this.newCampus.value.lokaal_campus
    }
    this.campusService.create(data);
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
