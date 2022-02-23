import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  addUserIshown: boolean = false;

  constructor(
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.closeFunction.subscribe((string) => {
        this.toggleShowAddUser();
      })
    }
  }

  toggleShowAddUser() {
    this.addUserIshown = ! this.addUserIshown;
  }
}
