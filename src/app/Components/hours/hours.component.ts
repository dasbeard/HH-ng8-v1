import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.scss"]
})
export class HoursComponent implements OnInit {
  @Input() hoursOfOp: object;
  @Input() hoursServing: object;

  hoursDisplayed: string;
  hoursToDisplay: object;

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
    // console.log(this.hoursServing);
    this.hoursToDisplay = this.hoursOfOp;
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
