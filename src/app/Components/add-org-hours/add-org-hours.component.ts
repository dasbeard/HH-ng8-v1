import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Models/user";
import { RegistationService } from "src/app/Services/registation.service";

class day {
  day: number;
  open: string = "";
  close: string = "";
  isClosed: boolean = false;
  error: boolean = true;
}

@Component({
  selector: "app-add-org-hours",
  templateUrl: "./add-org-hours.component.html",
  styleUrls: ["./add-org-hours.component.scss"]
})
export class AddOrgHoursComponent implements OnInit {
  user: User;
  errors;

  hoursOfOpArray = [];
  hoursServingArray = [];
  HOPArrayData = [];
  ServingArrayData = [];
  servingErrors: boolean = true;
  HOPErrors: boolean = true;

  constructor(private regService: RegistationService) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.createDayArrays("HOP");
    if (this.user.services.servesFood) {
      this.createDayArrays("Food");
    }
  }

  createDayArrays(identifier: string) {
    if (identifier === "HOP") {
      for (let index = 0; index < 7; index++) {
        const newDay = new day();
        newDay.day = index;
        this.hoursOfOpArray.push(newDay);
        this.HOPArrayData.push(newDay);
      }
    }
    if (identifier === "Food") {
      for (let index = 0; index < 7; index++) {
        const newDay = new day();
        newDay.day = index;
        this.hoursServingArray.push(newDay);
        this.ServingArrayData.push(newDay);
      }
    }

    // console.log(this.hoursOfOpArray);
  }


  receiveTime( identifier: string, $event) {
    // console.log(identifier, $event);
    // let day = $event.day;

    if (identifier === "HOP") {
      this.HOPArrayData[$event.day] = $event;
      this.validateAllDays(this.HOPArrayData, identifier);
    }

    if (identifier === "Food") {
      this.ServingArrayData[$event.day] = $event;
      this.validateAllDays(this.ServingArrayData, identifier);
    }
  }

  validateAllDays(dataArray: Array<day>, identifier: string) {
    // console.log('Validate Days Ran');
    // console.log(dataArray);

    if (identifier === "HOP") {
      if (dataArray.find(day => day.error === true)) {
        this.HOPErrors = true;
      } else {
        this.HOPErrors = false;
      }
    }

    if (identifier === "Food") {
      if (dataArray.find(day => day.error === true)) {
        this.servingErrors = true;
      } else {
        this.servingErrors = false;
      }
    }
  }

  addHoursToDB() {
    this.regService.addUserHours("hoursOfOp", this.HOPArrayData, this.user);

    if (this.user.services.servesFood) {
      this.regService.addUserHours(
        "servingFood",
        this.ServingArrayData,
        this.user
      );
    }
  }

}




  // arr.splice(index, 0, item);
  // array.find(x => x.name === 'string 1')
  // ~-~-~-~-~-~-~-~-~-~ New Functions ~-~-~-~-~-~-~-~-~-~