import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-edit-hours",
  templateUrl: "./edit-hours.component.html",
  styleUrls: ["./edit-hours.component.scss"]
})
export class EditHoursComponent implements OnInit {
  @Input() dayInput;
  @Input() isAdmin;
  @Output() dayOutput = new EventEmitter();

  editDayInput;
  dayForm: FormGroup;
  error: boolean = false;
  errorMessage: string;
  isClosedValue:boolean;
  days: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if(this.isAdmin){
      // console.log(this.isAdmin);
      this.editDayInput = this.dayInput;
    }

      this.createDayForm();

  }

  createDayForm() {
    
    this.dayForm = this.formBuilder.group({
      open: new FormControl(`${this.dayInput.open}`),
      close: new FormControl(`${this.dayInput.close}`),
      isClosed: new FormControl(this.dayInput.isClosed),
    });
      
    this.isClosedValue = this.dayInput.isClosed;
    if(this.isClosedValue === true) {
      this.dayForm.disable();
    }
  }

  createEditDayForm() {
    
    this.dayForm = this.formBuilder.group({
      open: new FormControl(`${this.editDayInput.open}`),
      close: new FormControl(`${this.editDayInput.close}`),
      isClosed: new FormControl(this.editDayInput.isClosed),
    });
      
    this.isClosedValue = this.editDayInput.isClosed;
    if(this.isClosedValue === true) {
      this.dayForm.disable();
    }
  }

  disableDay(data) {
    // console.log('closedValue Variable', this.isClosedValue);
    // console.log('data Value', data);
    
    if( data === false ) {
      // console.log(true);
      this.dayForm.setValue({
        open: `${this.dayForm.value.open}`,
        close: `${this.dayForm.value.close}`,
        isClosed: false
      });
      this.dayForm.enable();
      this.isClosedValue = true;
      this.sendDayBack();
    } else {
      // console.log(false);
      this.dayForm.setValue({
        open: `${this.dayForm.value.open}`,
        close: `${this.dayForm.value.close}`,
        isClosed: true
      });
      this.dayForm.disable();
      this.isClosedValue = false;
      this.sendDayBack();
    }

    // console.log(this.dayForm.value);
  }


  openTimeSet(event) {
    this.dayForm.value.open = event;
    this.sendDayBack();
  }

  closeTimeSet(event) {
    this.dayForm.value.close = event;
    this.sendDayBack();
  }

  sendDayBack() {
    let day = {
      day: this.dayInput.day,
      open: this.dayForm.value.open,
      close: this.dayForm.value.close,
      isClosed: this.dayForm.value.isClosed,
      error: false
    };

    if (this.dayForm.value.isClosed) {
      this.error = false;
      this.dayOutput.emit(day);
      
    } else if (
      this.dayForm.value.open &&
      this.dayForm.value.close &&
      !this.dayForm.value.isClosed
      ) {
        // console.log('Both Times Good - Not Closed');
        this.error = false;
      this.dayOutput.emit(day);

    } else {
      if (!this.dayForm.value.open) {
        // console.log("No Open Value");
        this.error = true;
        day.error = true;
        this.errorMessage = "Set open time";
        this.dayOutput.emit(day);
      } else if (!this.dayForm.value.close) {
        // console.log("No Open Value");
        this.error = true;
        day.error = true;
        this.errorMessage = "Set close time";
        this.dayOutput.emit(day);
      }

      if (this.dayForm.value.open && this.dayForm.value.close) {
        // console.log('Both Times Good');

        this.error = false;
        this.dayOutput.emit(day);
      }
    }

    // console.log(day);

  }
}
