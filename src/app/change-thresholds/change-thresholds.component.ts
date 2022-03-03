import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-change-thresholds',
  templateUrl: './change-thresholds.component.html',
  styleUrls: ['./change-thresholds.component.css']
})
export class ChangeThresholdsComponent implements OnInit {
  errors:string[] = [];
  thresholds = new FormGroup({
    maxGreen: new FormControl(500, [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    maxOrange: new FormControl(700, [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ])
  });

  constructor(private eventEmitterService: EventEmitterService, private fb:FormBuilder) {
  }

  get maxGreen(){
    return this.thresholds.get('maxGreen');
  }

  get maxOrange(){
    return this.thresholds.get('maxOrange');
  }

  ngOnInit(): void {
  }

  addTresholds():void{
    this.errors = [];
    if (this.maxOrange?.invalid){
      this.errors.push("'Oranje tot:' kan niet leeg zijn");
    }

    if(this.maxGreen?.invalid){
      this.errors.push("'Groen vanaf 0 tot:' kan niet leeg zijn");
    }

    if(this.thresholds.value.maxGreen >= this.thresholds.value.maxOrange && this.maxGreen?.valid && this.maxOrange?.valid){
      this.errors.push("De waarde van groen kan niet hoger zijn dan de waarde van oranje");
    }
  }

  close(){
    this.eventEmitterService.close();
  }

}
