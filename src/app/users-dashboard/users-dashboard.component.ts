import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  private campus_id:number;
  users:User[];


  addUserIshown: boolean = false;
  deleteUserIsShown: boolean = false;

  constructor(
    private eventEmitterService: EventEmitterService,
    private cookieService: CookieService,
    private userService: UserService
  ) {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));  
   }


  ngOnInit() {
    this.getAll()
    //to make the close button on modals work
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.closeFunction.subscribe((string) => {
        this.close();
      })
    }
  }

  getAll(){
    this.userService.getAll(this.campus_id).subscribe(data => this.users = data)
  }

  //to close all modals
  close(){
    this.addUserIshown = false;
    this.deleteUserIsShown = false;
  }

  toggleShowAddUser() {
    this.addUserIshown = ! this.addUserIshown;
  }

  toggleDeleteUser() {
    this.deleteUserIsShown = ! this.deleteUserIsShown
  }

}
