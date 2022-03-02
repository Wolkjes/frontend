import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { GrafanaService } from '../service/grafana.service';
import { LokaalService } from '../service/lookaal.service';

@Component({
  selector: 'app-delete-lokaal',
  templateUrl: './delete-lokaal.component.html',
  styleUrls: ['./delete-lokaal.component.css']
})
export class DeleteLokaalComponent implements OnInit {

  @Input() message:number;
  @Input() lokaal_naam:string;
  actieveSensorId:number;

  constructor(private eventEmitterService: EventEmitterService, private lokaalService:LokaalService, private grafanaService:GrafanaService, private cookieService:CookieService) {
      this.actieveSensorId = this.message;
   }

  ngOnInit(): void {
  }

  delete(){
    this.lokaalService.delete(this.message, this.cookieService.get("activeCampusNaam"), this.lokaal_naam);
    this.grafanaService.delete(this.lokaal_naam, Number.parseFloat(this.cookieService.get("activeCampusId")));

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  close() {
    this.eventEmitterService.close(); 
  }

}
