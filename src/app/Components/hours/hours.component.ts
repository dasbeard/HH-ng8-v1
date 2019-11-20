import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.scss"]
})
export class HoursComponent implements OnInit {
  @Input() hoursOfOp: Array<object>;
  @Input() hoursServing: Array<object>;
  
  @Input() identifier: string;
  @Output() identifierResponse = new EventEmitter;

  hoursDisplayed: string;
  hoursToDisplay: Array<object>;
  buttonSize: boolean = false;
  
  days: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  constructor(public dialog: MatDialog) {
    this.hoursDisplayed = "hoursOfOperation";
  }

  ngOnInit() {
    this.hoursToDisplay = this.hoursOfOp;
    if (this.hoursServing) {
      // console.log('not serving');
      this.buttonSize = true;
    } else {
      // console.log('serving food');
      this.buttonSize = false;
    }
    
  }




  changeHoursView(input) {
    if (input == "hoursOfOperation") {
      this.hoursDisplayed = "hoursOfOperation";
      this.hoursToDisplay = this.hoursOfOp;
      this.identifierResponse.emit('hoursOfOperation')
    }
    if (input == "hoursServing") {
      this.hoursDisplayed = "hoursServing";
      this.hoursToDisplay = this.hoursServing;
      this.identifierResponse.emit('hoursServingFood')
    }
  }

}
