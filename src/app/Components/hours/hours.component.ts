import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {

  displayHours:string;

  constructor() { 
    this.displayHours = 'HofOp';
  }

  ngOnInit() {
  }

  changeHours(input) {
    if(input == 'HofOp'){
      this.displayHours = 'HofOp'
    } 
    if(input == 'hServing'){
      this.displayHours = 'hServing'
    }

  }

}
