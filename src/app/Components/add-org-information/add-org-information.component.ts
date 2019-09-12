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
  websiteFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  contactEmailFormGroup: FormGroup;
  aboutFormGroup: FormGroup;
  servicesFormGroup: FormGroup;
  otherServicesFormGroup: FormGroup;

  formGroup: FormGroup;

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

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

  basicInfo() {
    const basicOrgInfo = {
      about: this.formGroup.value.formArray[0].about,
      website: this.formGroup.value.formArray[1].website,
      phone: this.formGroup.value.formArray[2].phone,
      contactEmail: this.formGroup.value.formArray[3].contactEmail,
    };

    // console.log(basicOrgInfo);
    this.regService.addUserInfo(basicOrgInfo);
  }
}
