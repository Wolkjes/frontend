import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-edit-campus',
  templateUrl: './edit-campus.component.html',
  styleUrls: ['./edit-campus.component.css']
})
export class EditCampusComponent implements OnInit {

  constructor(
    private eventEmitterService: EventEmitterService) {
   }

  ngOnInit(): void {
  }

  campusComponentFunction() {
    this.eventEmitterService.onCampusComponentButtonCLick();
  }

}
