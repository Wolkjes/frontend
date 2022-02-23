import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {

  }
  close(){
    this.eventEmitterService.close();
  }
}
