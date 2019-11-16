import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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
  @Output() message = new EventEmitter;

  hoursDisplayed: string;
  hoursToDisplay: Array<object>;
  buttonSize: boolean = false;
  
  newHoursToEdit: Array<object>;

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

    if(this.identifier){
      // console.log(this.hoursToDisplay);

    } 
    
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

  editHours( identifier) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: '800px',
      minHeight: "45vh",
      maxHeight: "85vh",
      data: {
        identifier: identifier,
        data: this.hoursToDisplay
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      let message = {
        identifier: identifier,
        result: result.event,
        hours: this.hoursToDisplay
      }
      this.message.emit(message);
      
    });
  }
}
