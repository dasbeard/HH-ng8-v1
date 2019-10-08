import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.scss"]
})
export class HoursComponent implements OnInit {
  @Input() hoursOfOp: Array<object>;
  @Input() hoursServing: Array<object>;

  hoursDisplayed: string;
  hoursToDisplay: object;
  buttonSize: boolean = false;

  days: Array<string> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  constructor() {
    this.hoursDisplayed = "hoursOfOperation";
  }

  ngOnInit() {
    // console.log(this.hoursOfOp);
    console.log(this.hoursServing);
    this.hoursToDisplay = this.hoursOfOp;
    if(this.hoursServing){
      console.log('not serving');
      this.buttonSize = true;
    } else {
      console.log('serving food');
      this.buttonSize = false;
    }

    console.log(this.buttonSize);
    
  }

  changeHoursView(input) {
    if (input == "hoursOfOperation") {
      this.hoursDisplayed = "hoursOfOperation";
      this.hoursToDisplay = this.hoursOfOp;
    }
    if (input == "hoursServing") {
      this.hoursDisplayed = "hoursServing";
      this.hoursToDisplay = this.hoursServing;
    }
  }
}
