import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }
}
