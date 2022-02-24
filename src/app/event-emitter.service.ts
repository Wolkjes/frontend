import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  //this was made to close all the modals because these are in different components
  closeFunction = new EventEmitter();
  subsVar: Subscription | undefined; 
  closeTFunction = new EventEmitter();
  subsVarTop: Subscription | undefined;
  subsTVar: undefined;

  constructor() { }

  close() {
    this.closeFunction.emit();
  }

  closeT() {
    this.closeTFunction.emit();
  }
}
