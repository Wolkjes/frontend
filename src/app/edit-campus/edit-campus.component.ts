import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Campus } from '../model/campus.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CampusService } from '../service/campus.service';
import { GrafanaService } from '../service/grafana.service';

@Component({
  selector: 'app-edit-campus',
  templateUrl: './edit-campus.component.html',
  styleUrls: ['./edit-campus.component.css']
})
export class EditCampusComponent implements OnInit {

  campusFrom:FormGroup;

  constructor(private grafanaService:GrafanaService, private eventEmitterService: EventEmitterService, private campusService:CampusService, fb: FormBuilder, private cookieService:CookieService) {
    this.campusFrom = fb.group({
      name_campus:[this.cookieService.get("activeCampusNaam")]
    })
   }

  ngOnInit(): void {
  }

  editCampus(): void{
    let campus_id = this.cookieService.get("activeCampusId");
    let campus_name = this.cookieService.get("activeCampusNaam");
    this.campusService.update(Number.parseFloat(campus_id), this.campusFrom.value.name_campus);
    this.grafanaService.updateCampus(Number.parseFloat(campus_id), this.campusFrom.value.name_campus, campus_name);


    this.setCookie("activeCampusNaam", this.campusFrom.value.name_campus);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  closeWindow() {
    this.eventEmitterService.close();
  }

}
