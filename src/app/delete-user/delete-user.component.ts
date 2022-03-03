import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitterService } from '../event-emitter.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() message:number;
  campus_id:number;
  constructor(private eventEmitterService: EventEmitterService, 
    private userService:UserService,
    private cookieService:CookieService) { }

  ngOnInit(): void {
    this.campus_id = Number.parseFloat(this.cookieService.get("activeCampusId"));  }

  close(){
  this.eventEmitterService.close();
  }

  deleteUser(){
    var data = {
      user_id:this.message,
      campus_id:this.campus_id
    }
    this.userService.delete(data);

    setTimeout(() => {
      window.location.reload();
    }, 100)
  }
}
