import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-change-thresholds',
  templateUrl: './change-thresholds.component.html',
  styleUrls: ['./change-thresholds.component.css']
})
export class ChangeThresholdsComponent implements OnInit {
  thresholds:FormGroup;

  constructor(private eventEmitterService: EventEmitterService, private fb:FormBuilder) {
    this.thresholds = this.fb.group({
      maxGreen:[0],
      maxOrange:[0]
    })
  }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }

}
