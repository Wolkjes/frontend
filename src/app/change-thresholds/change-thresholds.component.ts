import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-change-thresholds',
  templateUrl: './change-thresholds.component.html',
  styleUrls: ['./change-thresholds.component.css']
})
export class ChangeThresholdsComponent implements OnInit {


  constructor(private eventEmitterService: EventEmitterService) {
  }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }
}
