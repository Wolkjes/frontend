import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  closeFunction = new EventEmitter();
  subsVar: Subscription | undefined; 

  constructor() { }

  onCampusComponentButtonCLick() {
    this.closeFunction.emit();
  }
}
