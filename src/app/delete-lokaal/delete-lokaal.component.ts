import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-delete-lokaal',
  templateUrl: './delete-lokaal.component.html',
  styleUrls: ['./delete-lokaal.component.css']
})
export class DeleteLokaalComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  close() {
    this.eventEmitterService.close(); 
  }

}
