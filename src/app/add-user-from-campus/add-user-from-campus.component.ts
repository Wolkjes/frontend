import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-add-user-from-campus',
  templateUrl: './add-user-from-campus.component.html',
  styleUrls: ['./add-user-from-campus.component.css']
})
export class AddUserFromCampusComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  //Close button on modal
  close(){
    this.eventEmitterService.close();
  }

}
