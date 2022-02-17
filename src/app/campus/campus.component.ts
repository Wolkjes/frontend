import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  isShown: boolean = false;
  constructor() { }

  ngOnInit(): void {
    }

  toggleShow() {
    this.isShown = ! this.isShown;
  }
}
