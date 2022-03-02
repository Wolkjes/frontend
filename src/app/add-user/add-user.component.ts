import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';
import { User } from '../model/user.model'
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcryptjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private campus_id:number;
  newUser: FormGroup;
  private user:User[];

  constructor(fb: FormBuilder, private eventEmitterService: EventEmitterService, private userService: UserService, private cookieService:CookieService) {
    this.newUser = fb.group({
      username:[""],
      email:[""],
      password:[""],
      role:[""]
    });
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
  } 

  ngOnInit(): void {

  }

  close(){
    this.eventEmitterService.close();
  }

  addUser() {
    
    const salt = bcrypt.genSaltSync(10);
    var data = {
      username:this.newUser.value.username,
      email:this.newUser.value.email,
      password: bcrypt.hashSync(this.newUser.value.password, salt),
      role:this.newUser.value.role,
      campus_id:this.campus_id
    }
    this.userService.create(data).subscribe(data => {
      this.user = data;
    })
  }
}
