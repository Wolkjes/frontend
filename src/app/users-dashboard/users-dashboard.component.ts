import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  private campus_id:number;
  users:User[] = [];
  deleteUser:User;

  addUserIshown: boolean = false;
  addUserFromOtherCampusIsShown: boolean = false;
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
    console.log(this.users.length)
  }

  //to close all modals
  close(){
    this.addUserIshown = false;
    this.addUserFromOtherCampusIsShown = false;
    this.deleteUserIsShown = false;
  }

  toggleShowAddUser() {
    this.addUserIshown = ! this.addUserIshown;
  }

  toggleShowAddUserFromOtherCampus() {
    this.addUserFromOtherCampusIsShown = ! this.addUserFromOtherCampusIsShown;
  }
  
  updateUser(user:User){
    var username = ((<HTMLInputElement>document.getElementById(user.persoon_id + "username")).value);
    var email = ((<HTMLInputElement>document.getElementById(user.persoon_id + "email")).value);
    var password = ((<HTMLInputElement>document.getElementById(user.persoon_id + "password")).value);
    var role = ((<HTMLInputElement>document.getElementById(user.persoon_id + "role")).value);
    const salt = bcrypt.genSaltSync(10);
    var data;

    if  (password.trim() !== ""){
      data = {
        username:username,
        email:email,
        password:bcrypt.hashSync(password, salt),
        role:role
      }
    }else{
      data = {
        username:username,
        email:email,
        password: password,
        role:role
      }
    }
    this.userService.update(data, user.persoon_id);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  toggleDeleteUser(user:User) {
    this.deleteUserIsShown = ! this.deleteUserIsShown
    this.deleteUser = user;
  }

}
