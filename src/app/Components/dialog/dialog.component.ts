import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OrganizationsService } from 'src/app/Services/organizations.service';
import { RegistationService } from 'src/app/Services/registation.service';
import { User } from 'src/app/Models/user';

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
  hoursArray;
  HoursArrayData = [];
  HoursError: boolean = false;

  hoursToEdit: string;
  user$: User;

  constructor(
    private orgServices: OrganizationsService,
    private registrationService: RegistationService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // console.log(data);
    

    if ( data.identifier === "Address" ) {
      this.identifier = "Address";
      this.dataFromParent = data;
    } else if ( data.identifier === "deleteUser" ) {
      this.identifier = "deleteUser";
      this.dataFromParent = data;
    } else if ( data.identifier === "editHours" ) {
      // console.log(data);
      
      this.identifier = "editHours";
      this.user$ = data.user;

      if( data.hours === 'hoursOfOperation' ) {
        this.hoursToEdit = 'hoursOfOperation';
      } else if( data.hours === 'hoursServingFood' ) {
        this.hoursToEdit = 'hoursServingFood';
      } 

      
      this.orgServices.getOrgHours(this.user$.uid).subscribe( data => {
        if( data ){
          let userData = data.payload.data();
          if( this.hoursToEdit == 'hoursOfOperation' ) {
            this.hoursArray = userData.hoursOfOperation
          }        
          if( this.hoursToEdit == 'hoursServingFood' ) {
            this.hoursArray = userData.hoursServingFood
          }
        }
      })
    }
  }

  ngOnInit() {}


  // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

  receiveTime($event) {
    // console.log(identifier, $event);
    // let day = $event.day;

    this.hoursArray[$event.day] = $event;

    if (this.hoursArray.find(day => day.error === true)) {
      this.HoursError = true;
    } else {
      this.HoursError = false;
    }

  }

  updateHours(hours){
    // console.log(hours, this.hoursToEdit);
    this.registrationService.updateUserHours(this.user$, this.hoursToEdit, hours)

    let sendBack = {
      type: 'Updated Hours',
      hoursUpdated: this.hoursToEdit,
    }

    this.dialogRef.close({ event: sendBack });
  }


  // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

  receiveMessage($event) {
    console.log($event);
    this.closeDialog("address");
  }

  closeDialog(identifier: string) {
    let data = {
      type: identifier
    }
    this.dialogRef.close({ event: data });
    // this.dialogRef.close({event:'close',data:this.fromDialog});
  }
}
