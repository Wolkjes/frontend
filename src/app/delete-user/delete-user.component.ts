import { Component, Input, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() message:number;
  constructor(private eventEmitterService: EventEmitterService, private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.message)
  }

  close(){
  this.eventEmitterService.close();
  }

  deleteUser(){
    this.userService.delete(this.message);

    setTimeout(() => {
      window.location.reload();
    }, 100)
  }
}
