import { Component, OnInit } from "@angular/core";
import { RegistationService } from "src/app/Services/registation.service";
import { User } from "src/app/Models/user";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
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

  website;
  phone;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]


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
    // Sample
    if (this.user.website) {
      this.website = this.user.website;
    } else {
      this.website = "";
    }
    if (this.user.phone) {
      this.phone = this.user.phone;
    } else {
      this.phone = "";
    }

    this.createFormGroup();
  }


  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          website: [`${this.website}`]
        }),
        this.formBuilder.group({
          phone: [`${this.phone}`, Validators.required]
        }),
        this.formBuilder.group({
          contactEmail: ["", Validators.email]
        }),
        this.formBuilder.group({
          about: [""]
        }),
      ])
    });
  }

  basicInfo() {
    const basicOrgInfo = {
      website: this.formGroup.value.formArray[0].website,
      phone: this.formGroup.value.formArray[1].phone,
      contactEmail: this.formGroup.value.formArray[2].contactEmail,
      about: this.formGroup.value.formArray[3].about,
    }

    // console.log(basicOrgInfo);
    this.regService.addUserInfo(basicOrgInfo)

  }
}
