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
  dataFromParent;
  dataToSendBack;

  hoursArray;
  HoursArrayData = [];
  HoursError: boolean = false;
  
  hoursToEdit: string;
  
  user$: User;

  bedCount: number = 0;

// -~-~-~-~-~-~ Upload Image -~-~-~-~-~-~
  uploadPercent;
  imageData = {
    imageSelected: false,
    imgName: '',
    fileToUpload: File = null
  };


  constructor(
    private orgServices: OrganizationsService,
    private registrationService: RegistationService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private regService: RegistationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

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
    } else if ( data.identifier === 'bedCount') {
      this.identifier = data.identifier;
      this.user$ = data.user
      this.bedCount = data.user.bedCount;

    } else if ( data.identifier === 'editImage' ) {
      this.identifier = data.identifier;
      this.user$ = data.user;
    }
  }

  ngOnInit() {}

  
  updateBedCount(value){
    // console.log(value);
    this.registrationService.updateBedsAvailable(this.user$, true, value);
    

    // Close Dialog
    this.closeDialog('bedsUpdated');

  }


  receiveTime($event) {
    this.hoursArray[$event.day] = $event;

    if (this.hoursArray.find(day => day.error === true)) {
      this.HoursError = true;
    } else {
      this.HoursError = false;
    }

  }

  updateHours(hours){
    this.registrationService.updateUserHours(this.user$, this.hoursToEdit, hours)

    let sendBack = {
      type: 'Updated Hours',
      hoursUpdated: this.hoursToEdit,
    }

    this.dialogRef.close({ event: sendBack });
  }


  imageEventData($event) {
    // console.log($event);
    this.imageData = $event;
  }


  submitNewImage() {
    if(this.imageData.imageSelected) {
      if ( this.imageData.imgName === 'church') {
        this.regService.updatePhotoName(this.user$.uid, 'church')
        this.closeDialog('newImageSelected')        

      } else if (this.imageData.imgName === 'shelter') {
        this.regService.updatePhotoName(this.user$.uid, 'shelter')
        this.closeDialog('newImageSelected')        

      } else{
        this.regService.updatePhotoName(this.user$.uid, this.imageData.fileToUpload)
        
        this.regService.uploadPercent.subscribe( data => {          
          if(data) {
            this.uploadPercent = data;

            if( this.uploadPercent === 100 ) {
              setTimeout(() => {
                
                this.closeDialog('newImageUploaded')        
              }, 250);

              // this.closeDialog('newImageUploaded')        
            }
          }
        })
      }
    }
    
  }






  // -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

  receiveMessage($event) {
    // console.log($event);
    this.closeDialog($event);
  }

  closeDialog(identifier: string) {   
    let data = {
      type: identifier
    }
    this.dialogRef.close({ event: data });
  }
}
