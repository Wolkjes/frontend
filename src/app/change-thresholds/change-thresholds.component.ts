import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-change-thresholds',
  templateUrl: './change-thresholds.component.html',
  styleUrls: ['./change-thresholds.component.css']
})
export class ChangeThresholdsComponent implements OnInit {

  // myScriptElement: HTMLScriptElement;

  constructor(private eventEmitterService: EventEmitterService) {
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "https://cdn.jsdelivr.net/gh/maxshuty/accessible-web-components@latest/dist/simpleRange.min.js";
    // document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
  }

  close(){
    this.eventEmitterService.close();
  }
}
