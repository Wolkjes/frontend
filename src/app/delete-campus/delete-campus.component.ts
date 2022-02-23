import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-delete-campus',
  templateUrl: './delete-campus.component.html',
  styleUrls: ['./delete-campus.component.css']
})
export class DeleteCampusComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }

}
