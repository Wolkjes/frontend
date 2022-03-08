import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';
@Component({
  selector: 'app-ventilation-control',
  templateUrl: './ventilation-control.component.html',
  styleUrls: ['./ventilation-control.component.css']
})
export class VentilationControlComponent implements OnInit {
  errors: string[] = [];
  ventilatie = new FormGroup({
    groen: new FormControl(40, [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    oranje: new FormControl(60, [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    rood: new FormControl(80, [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ])
  });

  constructor(private eventEmitterService: EventEmitterService, private fb: FormBuilder) {
  }

  get groen() {
    return this.ventilatie.get('groen');
  }

  get oranje() {
    return this.ventilatie.get('oranje');
  }

  get rood() {
    return this.ventilatie.get('rood');
  }

  ngOnInit(): void {
  }

  addVentilatie(): void {
    this.errors = [];

    if (this.ventilatie.value.groen > 100 || this.ventilatie.value.rood > 100 || this.ventilatie.value.oranje > 100) {
      this.errors.push("Geef een getal tussen 0 en 100 in!");
    }
    
    if (this.ventilatie.value.groen < 0 || this.ventilatie.value.rood  < 0 || this.ventilatie.value.oranje < 0) {
      this.errors.push("Geef een getal tussen 0 en 100 in!");
    }

    if (this.errors.length === 0) {
      if (this.oranje?.invalid || this.groen?.invalid || this.rood?.invalid) {
        this.errors.push("er zijn nog velden leeg");
      }
    }
  }

  close() {
    this.eventEmitterService.close();
  }


}
