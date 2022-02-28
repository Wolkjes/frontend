import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Campus } from '../model/campus.model';
import { Sensor } from '../model/sensor.model';
import { SensorService } from '../service/sensor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CampusService } from '../service/campus.service';

@Component({
  selector: 'app-delete-campus',
  templateUrl: './delete-campus.component.html',
  styleUrls: ['./delete-campus.component.css']
})
export class DeleteCampusComponent implements OnInit {
  private campus: Campus[];
  campusDel: FormGroup;

  constructor(private eventEmitterService: EventEmitterService, fb: FormBuilder,  private campusService: CampusService,private cookieService: CookieService) { 
    this.campusDel = fb.group({
      confirm_message: [""],
    });
  }

  deleteCampus(): void{
    if (this.campusDel.value.confirm_message !== document.getElementById("confirm")?.textContent){
      alert("PLS confirm that you want to delete the campus")
    }else{
      this.campusService.delete(this.cookieService.get("activeCampusId"));
      this.campusService.getAll().subscribe(data => {
        this.campus = data;
        this.update(data);
      });
    }
  }

  update(data:any): void{
    this.campus = data;
    this.cookieService.set("activeCampusId", this.campus[0].campus_id.toString());
    this.cookieService.set("activeCampusNaam", this.campus[0].name);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }

}
