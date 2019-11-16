import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/Components/dialog/dialog.component";

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.scss"]
})
export class HoursComponent implements OnInit {
  @Input() hoursOfOp: Array<object>;
  @Input() hoursServing: Array<object>;
  @Input() identifier: string;

  hoursDisplayed: string;
  hoursToDisplay: object;
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

    // console.log(this.buttonSize);
    // console.log(this.hoursToDisplay);
    
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

  editHours(hoursToEdit, identifier) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: '800px',
      minHeight: "45vh",
      maxHeight: "85vh",
      data: {
        identifier: identifier,
        data: hoursToEdit
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    // });
  }
}
