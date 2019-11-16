import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

class day {
  day: number;
  open: string = "";
  close: string = "";
  isClosed: boolean = false;
  error: boolean = true;
}

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent implements OnInit {
  identifier: string;
  dataFromParent: object;
  dataToSendBack;
  hoursArray = [];
  HoursArrayData = [];
  HoursError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.identifier === "Address") {
      this.identifier = "Address";
      this.dataFromParent = data;
    } else if (data.identifier === "deleteUser") {
      // console.log('deleteUser');

      this.identifier = "deleteUser";
      this.dataFromParent = data;
    } else if (
      data.identifier === "hoursOfOperation" ||
      data.identifier === "hoursServing"
    ) {
      // console.log("editHours", data);
      this.identifier = "editHours";
      this.dataFromParent = data;

      this.hoursArray = data.data;
      this.HoursArrayData = data.data;
      console.log(this.hoursArray);

      // this.createDayArrays(data.identifier);
    }
  }

  ngOnInit() {}


  // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

  receiveTime($event, identifier: string) {
    // console.log(identifier, $event);
    // let day = $event.day;

    this.HoursArrayData[$event.day] = $event;
    this.validateAllDays(this.HoursArrayData, identifier);
  }

  validateAllDays(dataArray: Array<day>, identifier: string) {
    // console.log('Validate Days Ran');
    // console.log(dataArray);

    if (dataArray.find(day => day.error === true)) {
      this.HoursError = true;
    } else {
      this.HoursError = false;
    }
  }















  // addHoursToDB() {
  //   this.regService.addUserHours("hoursOfOp", this.HOPArrayData, this.user);

  //   if (this.user.services.servesFood) {
  //     this.regService.addUserHours(
  //       "servingFood",
  //       this.ServingArrayData,
  //       this.user
  //     );
  //   }
  // }

  // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

  receiveMessage($event) {
    // console.log($event);
    this.closeDialog("address");
  }

  closeDialog(identifier: string) {
    this.dialogRef.close({ event: identifier });
    // this.dialogRef.close({event:'close',data:this.fromDialog});
  }
}
