import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { Campus } from '../model/campus.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CampusService } from '../service/campus.service';
import { GrafanaService } from '../service/grafana.service';


@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit {

  newCampus: FormGroup;
  private campus:Campus[];

  constructor(fb: FormBuilder,  private campusService: CampusService, private grafanaService: GrafanaService) {
    this.newCampus = fb.group({
      lokaal_campus: [""],
    });
   }

  addCampus() {
    var data = {
      name: this.newCampus.value.lokaal_campus
    }
    this.campusService.create(data).subscribe(data => {
      this.campus = data;
      this.update(data);
    });    
  }

  update(data:any): void{
    this.campus = data;
    this.grafanaService.create(this.campus[0])

    this.setCookie("activeCampusId", this.campus[0].campus_id);
    this.setCookie("activeCampusNaam", this.campus[0].name)

    window.location.reload();
  }

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  ngOnInit(): void {
  }

}
