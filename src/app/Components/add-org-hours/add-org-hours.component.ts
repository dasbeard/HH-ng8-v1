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
      open: new FormControl({value:"", disabled: false}),
      close: new FormControl({value:"", disabled: false}),
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

 

  addHours() {
    const HP = this.hoursOfOperation.controls;
    const SF = this.hoursServingFood.controls;
    
    // !! Check for Errors HERE First
    let HoursOfOpArray = [];
    HoursOfOpArray.push(HP.monday.value);
    HoursOfOpArray.push(HP.tuesday.value);
    HoursOfOpArray.push(HP.wednesday.value);
    HoursOfOpArray.push(HP.thursday.value);
    HoursOfOpArray.push(HP.friday.value);
    HoursOfOpArray.push(HP.saturday.value);
    HoursOfOpArray.push(HP.sunday.value);
        
    this.regService.addUserHours("hoursOfOp", HoursOfOpArray, this.user);

    if (this.user.services.servesFood) {
      // console.log("servingFood checking for closed");

      // !! Check for Errors HERE First
      let HoursServingArray = [];
      HoursServingArray.push(SF.monday.value);
      HoursServingArray.push(SF.tuesday.value);
      HoursServingArray.push(SF.wednesday.value);
      HoursServingArray.push(SF.thursday.value);
      HoursServingArray.push(SF.friday.value);
      HoursServingArray.push(SF.saturday.value);
      HoursServingArray.push(SF.sunday.value);
  
      this.regService.addUserHours("servingFood", HoursServingArray, this.user);
    }
  }



  disableDay(data) {

    if(data.value.isClosed) {
      data.setValue({open:`${data.value.open}`, close:`${data.value.close}`, isClosed: false})
      data.enable();
    } else {
      data.setValue({open:`${data.value.open}`, close:`${data.value.close}`, isClosed: true})
      data.disable(); 
    }

    // setTimeout(() => {
    //   console.log(data.value);
    // }, 100);
  }


// TODO: Refine this function
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
