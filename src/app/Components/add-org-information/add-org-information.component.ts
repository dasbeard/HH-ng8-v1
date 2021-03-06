import { Component, OnInit } from "@angular/core";
import { RegistationService } from "src/app/Services/registation.service";
import { User } from "src/app/Models/user";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-add-org-information",
  templateUrl: "./add-org-information.component.html",
  styleUrls: ["./add-org-information.component.scss"]
})
export class AddOrgInformationComponent implements OnInit {
  user: User;

  isLinear = false;

  // TODO: See if these are being used
  websiteFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  contactEmailFormGroup: FormGroup;
  aboutFormGroup: FormGroup;
  servicesFormGroup: FormGroup;
  otherServicesFormGroup: FormGroup;
  // TODO: See if these are being used

  formGroup: FormGroup;

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;



  uploadPercent;
  imageName: string;
  imageData = {
    imageSelected: false,
    imgName: '',
    fileToUpload: File = null
  };

  public mask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  constructor(
    private regService: RegistationService,
    private formBuilder: FormBuilder
    ) {
      // ! Maybe this should be session not localstorage
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    
    ngOnInit() {
      this.checkUserData();
      this.createFormGroup();
  }

  checkUserData() {
    if (!this.user.about) {
      this.user.about = "";
    }

    if (!this.user.phone) {
      this.user.phone = "";
    }

    if (!this.user.contactEmail) {
      this.user.contactEmail = "";
    }
    
    if (!this.user.website) {
      this.user.website = "";
    }
    
  }
  
  createFormGroup() {

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          about: [`${this.user.about}`]
        }),
        this.formBuilder.group({
          website: [`${this.user.website}`]
        }),
        this.formBuilder.group({
          phone: [`${this.user.phone}`, Validators.required]
        }),
        this.formBuilder.group({
          contactEmail: [`${this.user.contactEmail}`, Validators.email]
        })
      ])
    });
  }


//  -~-~-~-~-~-~-~ Image -~-~-~-~-~-~-~-~-~

imageEventData($event) {
  // console.log($event);
  this.imageData = $event;
  this.submitImage()
}


submitImage() {
  if(this.imageData.imageSelected) {
    if ( this.imageData.imgName === 'church') {
      this.imageName = 'Church.jpg';
      // console.log(this.imageName);
      
    } else if (this.imageData.imgName === 'shelter') {
      this.imageName = 'Shelter.jpg';
      // console.log(this.imageName);


    } else{

      let ext = this.regService.getImageExtension(this.imageData.fileToUpload);
      this.imageName = this.user.uid + '.' + ext;
      // console.log(this.imageName);
      
    }
  }
  
}






//  -~-~-~-~-~-~-~ End Image -~-~-~-~-~-~-~-~-~




  saveBasicInfo() {
    const basicOrgInfo = {
      about: this.formGroup.value.formArray[0].about,
      website: this.formGroup.value.formArray[1].website,
      phone: this.formGroup.value.formArray[2].phone,
      contactEmail: this.formGroup.value.formArray[3].contactEmail,
      photoName: this.imageName
    };




    console.log(this.imageName);
    

    if( this.imageName === 'Church.jpg'){
      this.regService.addUserInfo(basicOrgInfo);
    } else if( this.imageName === 'Shelter.jpg'){
      this.regService.addUserInfo(basicOrgInfo);
    } else {

      this.regService.uploadNewImage(this.user.uid, this.imageData.fileToUpload);
      
      this.regService.uploadPercent.subscribe( data => {          
        if(data) {
          this.uploadPercent = data;
          
          if( this.uploadPercent === 100 ) {
              this.regService.addUserInfo(basicOrgInfo);
            }
        }
      })
    }




 
    // console.log(basicOrgInfo);
  }
}
