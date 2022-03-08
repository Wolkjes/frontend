import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcryptjs';
import { TokenStorageService } from '../service/token-storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  private campus_id: number;
  persoon_id: number;
  token: any;
  decodedToken: any;
  errors: string[] = [];
  Allusers: User[] = [];

  users: User[] = [];
  deleteUser: User;

  addUserIshown: boolean = false;
  addUserFromOtherCampusIsShown: boolean = false;
  deleteUserIsShown: boolean = false;


  constructor(
    private eventEmitterService: EventEmitterService,

    private cookieService: CookieService,
    private tokenService: TokenStorageService,
    private userService: UserService
  ) {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    if (sessionStorage.getItem('auth-user')) {
      this.token = this.tokenService.getToken();
      this.decodedToken = jwt_decode(this.token);
    }
  }


  ngOnInit() {
    this.getAll();
    this.getAllUser();
    //to make the close button on modals work
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.closeFunction.subscribe((string) => {
        this.close();
      })
    }
  }

  getAllUser() {
    this.userService.getAllUsers().subscribe(data => this.Allusers = data);
  }

  getAll() {
    this.userService.getAll(this.campus_id).subscribe(data => this.users = data)
  }

  //to close all modals
  close() {
    this.addUserIshown = false;
    this.addUserFromOtherCampusIsShown = false;
    this.deleteUserIsShown = false;
  }

  toggleShowAddUser() {
    this.addUserIshown = !this.addUserIshown;
  }

  toggleShowAddUserFromOtherCampus() {
    this.addUserFromOtherCampusIsShown = !this.addUserFromOtherCampusIsShown;
  }

  updateUser(user: User) {
    this.errors = [];
    var username = ((<HTMLInputElement>document.getElementById(user.persoon_id + "username")).value);
    var email = ((<HTMLInputElement>document.getElementById(user.persoon_id + "email")).value);
    var password = ((<HTMLInputElement>document.getElementById(user.persoon_id + "password")).value);
    var role = ((<HTMLInputElement>document.getElementById(user.persoon_id + "role")).value);

    for (let u of this.Allusers) {
      if (u.email === email && u.persoon_id !== user.persoon_id) {
        this.errors.push("Er bestaat al een user met deze email")
      }
    }

    if (username.trim() === "") {
      this.errors.push("Username kan niet leeg zijn!");
    }

    if (email.trim() === "") {
      this.errors.push("Email kan niet leeg zijn!");
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      this.errors.push("Dit is geen geldig email adres")
    }

    const salt = bcrypt.genSaltSync(10);
    var data;

    if (password.trim() !== "") {
      data = {
        username: username,
        email: email,
        password: bcrypt.hashSync(password, salt),
        role: role
      }
    } else {
      data = {
        username: username,
        email: email,
        password: password,
        role: role
      }
    }

    if (this.errors.length === 0) {
      this.userService.update(data, user.persoon_id);

      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  toggleDeleteUser(user: User) {
    this.deleteUserIsShown = !this.deleteUserIsShown
    this.deleteUser = user;
  }

}
