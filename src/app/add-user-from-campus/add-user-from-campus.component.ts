import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user-from-campus',
  templateUrl: './add-user-from-campus.component.html',
  styleUrls: ['./add-user-from-campus.component.css']
})
export class AddUserFromCampusComponent implements OnInit {

  errors:string[] = [];
  addUserToCampus = new FormGroup({
    user_email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    ])
  });
  private users:User[];
  private campus_id:number;
  private gevondeUser:User;
  campus_naam:string;

  constructor(private eventEmitterService: EventEmitterService, private cookieService:CookieService, private userService:UserService) { 
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
    this.campus_naam = this.cookieService.get("activeCampusNaam");
    this.users = [];
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  //Close button on modal
  close(){
    this.eventEmitterService.close();
  }

  get user_email(){
    return this.addUserToCampus.get('user_email');
  }

  addToCampus(){

    this.errors = [];

    if (this.user_email?.invalid){
      this.errors.push("Het email adres kan niet leeg zijn!")
    }

    for (let user of this.users){
      console.log(this.addUserToCampus.value.user_email + " " + user.email);
      if(this.addUserToCampus.value.user_email === user.email){
        this.gevondeUser = user;
      }
    }

    if(this.gevondeUser === undefined){
      this.errors.push("Er bestaat geen user met dit email!");
    }else{
      this.userService.addToCampus(this.campus_id, this.gevondeUser.persoon_id).subscribe(data => {
        if(data['value'] === "Al toegevoegd"){
          this.errors.push("Al toegevoegd");
        }else{
          window.location.reload();
        }
      });
    }

  }

}
