import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  close(){
  this.eventEmitterService.close();
  }
}
