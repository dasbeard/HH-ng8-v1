import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Models/user";
import { RegistationService } from "src/app/Services/registation.service";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from "@angular/forms";

import { map } from "rxjs/operators";

@Component({
  selector: "app-add-org-hours",
  templateUrl: "./add-org-hours.component.html",
  styleUrls: ["./add-org-hours.component.scss"]
})
export class AddOrgHoursComponent implements OnInit {
  user: User;

  constructor(
    private regService: RegistationService,
    private formBuilder: FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  testDisabled = true;

  ngOnInit() {}

  hoursOfOperation = new FormGroup({
    monday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    tuesday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    wednesday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    thursday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    friday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    saturday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    sunday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    })
  });

  hoursServingFood = new FormGroup({
    monday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    tuesday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    wednesday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    thursday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    friday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    saturday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    }),
    sunday: new FormGroup({
      open: new FormControl(""),
      close: new FormControl(""),
      isClosed: new FormControl(<boolean>false)
    })
  });

  get mClosed(): any {
    return this.hoursOfOperation.get("monday.isClosed");
  }
  get tClosed(): any {
    return this.hoursOfOperation.get("tuesday.isClosed");
  }
  get wClosed(): any {
    return this.hoursOfOperation.get("wednesday.isClosed");
  }
  get thClosed(): any {
    return this.hoursOfOperation.get("thursday.isClosed");
  }
  get fClosed(): any {
    return this.hoursOfOperation.get("friday.isClosed");
  }
  get saClosed(): any {
    return this.hoursOfOperation.get("saturday.isClosed");
  }
  get suClosed(): any {
    return this.hoursOfOperation.get("sunday.isClosed");
  }

  get mFClosed(): any {
    return this.hoursServingFood.get("monday.isClosed");
  }
  get tFClosed(): any {
    return this.hoursServingFood.get("tuesday.isClosed");
  }
  get wFClosed(): any {
    return this.hoursServingFood.get("wednesday.isClosed");
  }
  get thFClosed(): any {
    return this.hoursServingFood.get("thursday.isClosed");
  }
  get fFClosed(): any {
    return this.hoursServingFood.get("friday.isClosed");
  }
  get saFClosed(): any {
    return this.hoursServingFood.get("saturday.isClosed");
  }
  get suFClosed(): any {
    return this.hoursServingFood.get("sunday.isClosed");
  }

  get HOP(): any {
    return this.hoursServingFood.get("sunday.isClosed");
  }

  addHours() {
    // console.log(this.hoursOfOperation.value);

    let hoursOfOp = this.findClosed(this.hoursOfOperation.value);
    // console.log(hoursOfOp);

    this.regService.addUserHours("hoursOfOp", hoursOfOp, this.user);

    if (this.user.services.servesFood) {
      console.log("servingFood checking for closed");
      let hoursServing = this.findClosed(this.hoursServingFood.value);
      this.regService.addUserHours("servingFood", hoursServing, this.user);
    }
  }

  findClosed(dataSet) {
    let modifiedDataSet = dataSet;
    Object.keys(dataSet).forEach(function(day) {
      if (dataSet[day].isClosed == true) {
        // console.log(dataSet[day]);
        modifiedDataSet[day].open = "";
        modifiedDataSet[day].close = "";
      }
    });

    return modifiedDataSet;
  };

}
