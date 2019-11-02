import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface dayBuilder {
  open,
  close,
  isClosed: boolean
};

@Component({
  selector: "app-edit-hours",
  templateUrl: "./edit-hours.component.html",
  styleUrls: ["./edit-hours.component.scss"]
})


export class EditHoursComponent implements OnInit {
  
  @Input() dayInput: dayBuilder;
  dayForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit() {
    this.createDayForm();
  }


  createDayForm(){
    this.dayForm = this.formBuilder.group({
      open: new FormControl(''),
      close: new FormControl(''),
      isClosed: new FormControl(<boolean>false)
    })
  }


  disableDay(data) {
    
    if(data.value) {
      this.dayForm.setValue({open:`${this.dayForm.value.open}`, close:`${this.dayForm.value.close}`, isClosed: false})
      this.dayForm.enable();
    } else {
      this.dayForm.setValue({open:`${this.dayForm.value.open}`, close:`${this.dayForm.value.close}`, isClosed: true})
      this.dayForm.disable(); 
    }

  }

  showData() {
    console.log(this.dayForm.value);
    
  }

  
  
}
  





  // hoursOfOperation = new FormGroup({
  //   monday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   }),
  //   tuesday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   }),
  //   wednesday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   }),
  //   thursday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   }),
  //   friday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   }),
  //   saturday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   }),
  //   sunday: new FormGroup({
  //     open: new FormControl(""),
  //     close: new FormControl(""),
  //     isClosed: new FormControl(<boolean>false)
  //   })
  // });
