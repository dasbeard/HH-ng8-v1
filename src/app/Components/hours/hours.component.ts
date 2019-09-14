import { Component, OnInit, Input } from '@angular/core';

export interface Hours {
  day: string;
  open: string;
  spacer: string;
  close: string;
}

const hoursOfOperation1: Hours[] = [
  {day: 'Mon', open: '12:30am', spacer: '-', close: '11:15pm'},
  {day: 'Tue', open: '1:30am', spacer: '-', close: '1:45pm'},
  {day: 'Wen', open: '10:30am', spacer: '-', close: '12:00pm'},
  {day: 'Thu', open: '9:00am', spacer: '-', close: '5:15pm'},
  {day: 'Fri', open: '4:30am', spacer: '-', close: '6:30pm'},
  {day: 'Sat', open: '3:45am', spacer: '-', close: '8:15pm'},
  {day: 'Sun', open: '7:15am', spacer: '-', close: '12:45pm'}
];


const hoursServingFood1: Hours[] = [
  {day: 'Mon', open: '1:30am', spacer: '-', close: '1:15pm'},
  {day: 'Tue', open: '12:30am', spacer: '-', close: '4:45pm'},
  {day: 'Wen', open: '5:30am', spacer: '-', close: '11:00pm'},
  {day: 'Thu', open: '7:00am', spacer: '-', close: '7:15pm'},
  {day: 'Fri', open: '3:30am', spacer: '-', close: '9:30pm'},
  {day: 'Sat', open: '4:45am', spacer: '-', close: '7:15pm'},
  {day: 'Sun', open: '2:15am', spacer: '-', close: '2:45pm'}
];




@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
  @Input() hoursOfOp: object;
  @Input() hoursServing: object;

  hoursDisplayed:string;

  displayedColumns: string[] = ['day', 'open', 'spacer', 'close'];
  HofOp = hoursOfOperation1;
  serving = hoursServingFood1;
  
  constructor() { 
    this.hoursDisplayed = 'HofOp';
  }

  ngOnInit() {
    // console.log(this.hoursDisplayed);
    console.log(this.HofOp, this.hoursServing);
    
  }

  changeHours(input) {
    if(input == 'HofOp'){
      this.hoursDisplayed = 'HofOp'
    } 
    if(input == 'serving'){
      this.hoursDisplayed = 'serving'
    }

  }

}
