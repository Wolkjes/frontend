import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  users:User[]
  errors:string[] = [];
  newUser = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
    ]),
    confirm: new FormControl("", [
      Validators.required
    ]),
    username: new FormControl("", [
      Validators.required

    ]),
    role: new FormControl("", [
      Validators.required

    ])
  })

  user:User
  userForm: FormControl;

  constructor(fb: FormBuilder, 
    private eventEmitterService: EventEmitterService, 
    private userService: UserService, 
    private cookieService:CookieService) {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));
  } 

  ngOnInit(): void {
    // this.userService.emails().subscribe(data => {
    //   console.log(data)
    //   this.users = data}
    //   )
  }

  get username(){
    return this.newUser.get('username');
  }

  get email(){
    return this.newUser.get('email');
  }

  get password(){
    return this.newUser.get('password');
  }

  get confirm(){
    return this.newUser.get('confirm');
  }

  get role(){
    return this.newUser.get('role');
  }


  close(){
    this.eventEmitterService.close();
  }

  addUser() {
    this.errors = [];
    if (this.username?.invalid){
      this.errors.push("username mag niet leeg zijn.")
    }
    if (this.email?.invalid){
      this.errors.push("Email is niet van het juiste formaat")
    }
    if (this.email?.invalid)
    if (this.password?.invalid){
      this.errors.push("the password can't be empty")
    }
    if (this.role?.invalid){
      this.errors.push("De role mag niet leeg zijn")
    }
    if (this.newUser.value.password != this.newUser.value.confirm){
      this.errors.push("De wachtwoorden moeten hetzelfde zijn.")
    }
    if (this.password?.hasError('pattern')){
      this.errors.push("Een cijfer, een kleine letter, een hoofdletter en een lengte van 8 is verplicht voor een wachtwoord.")
    }
    
    // console.log(this.users)
    
    // console.log(this.users.includes(this.newUser.value.email))
    // if (this.users.includes(this.newUser.value.email)){
    //   this.errors.push("Deze email bestaat al. Kies een andere email")
    // }

    if (this.errors.length ===0){
      const salt = bcrypt.genSaltSync(10);
      var data = {
        username:this.newUser.value.username,
        email:this.newUser.value.email,
        password: bcrypt.hashSync(this.newUser.value.password, salt),
        role:this.newUser.value.role,
        campus_id:this.campus_id
      }
      this.userService.create(data).subscribe(data => {
        if(data['value'] === "Deze user bestaat al"){
          this.errors.push("Deze user bestaat al");
        }else{
          window.location.reload();
        }
      });
    }
  }
}
