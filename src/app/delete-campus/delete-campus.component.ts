import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Campus } from '../model/campus.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CampusService } from '../service/campus.service';
import { GrafanaService } from '../service/grafana.service';

@Component({
  selector: 'app-delete-campus',
  templateUrl: './delete-campus.component.html',
  styleUrls: ['./delete-campus.component.css']
})
export class DeleteCampusComponent implements OnInit {
  private campus: Campus[];
  campusDel: FormGroup;

  constructor(private eventEmitterService: EventEmitterService, fb: FormBuilder,  private campusService: CampusService,private cookieService: CookieService, private grafanaService:GrafanaService) { 
    this.campusDel = fb.group({
      confirm_message: [""],
    });
  }

  deleteCampus(): void{
    if (this.campusDel.value.confirm_message !== document.getElementById("confirm")?.textContent){
      alert("PLS confirm that you want to delete the campus")
    }else{
      this.campusService.delete(this.cookieService.get("activeCampusId"), this.cookieService.get("activeCampusNaam"));
      this.grafanaService.deleteDashboard(this.cookieService.get("activeCampusId"));
      setTimeout(() => {
        this.campusService.getAll().subscribe(data => {
          this.campus = data;
          this.update(data);
        });
      }, 500);
    }
  }

  update(data:any): void{
    if (this.campus.length === 0){
      this.setCookie("activeCampusId", 0);
      this.setCookie("activeCampusNaam", "PLS select a campus");
    }else{
      this.setCookie("activeCampusId", this.campus[0].campus_id);
      this.setCookie("activeCampusNaam", this.campus[0].name);
    }
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }

}
