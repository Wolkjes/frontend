import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { Campus } from '../model/campus.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CampusService } from '../service/campus.service';
import { GrafanaService } from '../service/grafana.service';

@Component({
  selector: 'app-edit-campus',
  templateUrl: './edit-campus.component.html',
  styleUrls: ['./edit-campus.component.css']
})
export class EditCampusComponent implements OnInit {

  errors: string[] = [];
  campusFrom = new FormGroup({
    name_campus: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ])
  });

  constructor(private grafanaService: GrafanaService, private eventEmitterService: EventEmitterService, private campusService: CampusService, fb: FormBuilder, private cookieService: CookieService) {

  }

  ngOnInit(): void {
  }

  get name_campus() {
    return this.campusFrom.get('name_campus');
  }

  editCampus(): void {
    this.errors = [];
    if (this.name_campus?.invalid) {
      this.errors.push("Campus naam kan niet leeg zijn!");
    }

    if (this.errors.length === 0) {
      let campus_id = this.cookieService.get("activeCampusId");
      let campus_name = this.cookieService.get("activeCampusNaam");
      this.campusService.update(Number.parseFloat(campus_id), this.campusFrom.value.name_campus).subscribe(
        function (x) {

        },
        function (err) {

        },
        () => {
          console.log("completed")
          this.grafanaService.updateCampus(Number.parseFloat(campus_id), this.campusFrom.value.name_campus, campus_name).subscribe(
            (data) => {
              console.log(data);
              this.setCookie("activeCampusNaam", this.campusFrom.value.name_campus);
            },
            function (err) {

            },
            () => {
              console.log("completed")
              window.location.reload();
            }
          );
        }
      );
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
    }
  }

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  closeWindow() {
    this.eventEmitterService.close();
  }

}
