import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "src/app/Models/user";
import { OrganizationsService } from "src/app/Services/organizations.service";

@Component({
  selector: "app-hours",
  templateUrl: "./hours.component.html",
  styleUrls: ["./hours.component.scss"]
})
export class HoursComponent implements OnInit, OnChanges {
  // @Input() hoursOfOp: Array<object>;
  // @Input() hoursServing: Array<object>;
  hoursOfOp;
  hoursServing;

  @Input() user: User;
  @Input() showHours: string;
  @Output() identifierResponse = new EventEmitter();

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

  constructor(
    public dialog: MatDialog,
    private organizationService: OrganizationsService
  ) {}

  ngOnChanges() {
    
    if (this.showHours) {
      this.hoursDisplayed = this.showHours;
    } else {
      this.hoursDisplayed = "hoursOfOperation";
    }
    this.changeHoursView(this.hoursDisplayed);
    
    // console.log(this.showHours);
    // console.log(this.hoursDisplayed);
  }

  ngOnInit() {


    this.organizationService.getOrgHours(this.user.uid).subscribe(data => {
      this.hoursOfOp = data.payload.data().hoursOfOperation;
      this.hoursServing = data.payload.data().hoursServingFood;
      // this.hoursToDisplay = this.hoursOfOp;
      this.changeHoursView(this.hoursDisplayed);

    });

    if (this.hoursServing) {
      // console.log('not serving');
      this.buttonSize = true;
    } else {
      // console.log('serving food');
      this.buttonSize = false;
    }
  }

  changeHoursView(input) {
    // console.log(input);

    if (input === `hoursOfOperation`) {
      this.hoursDisplayed = "hoursOfOperation";
      this.hoursToDisplay = this.hoursOfOp;
      this.identifierResponse.emit("hoursOfOperation");
    }
    if (input === "hoursServingFood") {
      this.hoursDisplayed = "hoursServingFood";
      this.hoursToDisplay = this.hoursServing;
      this.identifierResponse.emit("hoursServingFood");
    }
  }
}
