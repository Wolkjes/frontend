import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { Campus } from '../model/campus.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CampusService } from '../service/campus.service';
import { GrafanaService } from '../service/grafana.service';
import { LokaalService } from '../service/lookaal.service';
import { Lokaal } from '../model/lokaal.model';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { TokenStorageService } from '../service/token-storage.service';
import jwt_decode from 'jwt-decode'


@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit {

  campus_id: number;
  private campus: Campus[];
  errors: string[] = [];
  newCampus = new FormGroup({
    lokaal_campus: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ])
  });

  decodedToken: any;
  token;

  constructor(fb: FormBuilder, private campusService: CampusService, private grafanaService: GrafanaService, private tokenService: TokenStorageService) {
    this.token = this.tokenService.getToken();
    if (this.token !== null) {
      this.decodedToken = jwt_decode(this.token);
    }
    console.log(this.decodedToken);
  }

  get lokaal_campus() {
    return this.newCampus.get('lokaal_campus');
  }

  addCampus() {
    this.errors = [];
    if (this.lokaal_campus?.invalid) {
      this.errors.push("Campus naam kan niet leeg zijn!");
    }

    if (this.errors.length === 0) {
      console.log(this.decodedToken.persoon_id)
      var data = {
        name: this.newCampus.value.lokaal_campus,
        persoon_id: this.decodedToken.persoon_id
      }
      this.campusService.create(data).subscribe(data => {
        if (data['value'] === "Deze campus bestaat al") {
          this.errors.push("Deze campus bestaat al");
        } else {
          this.campus = data;
          this.update(data);
          window.location.reload();
        }
      });
    }
  }

  update(data: any): void {
    this.campus = data;
    this.grafanaService.create(this.campus[0]).subscribe(data => {
      console.log(data);

      this.setCookie("activeCampusId", this.campus[0].campus_id);
      this.setCookie("activeCampusNaam", this.campus[0].name)
    })
  }

  setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + "=" + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  }

  ngOnInit(): void {

  }

}
