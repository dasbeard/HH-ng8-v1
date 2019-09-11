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

  // Sample

  fruits: Array<string> = [
    "apple",
    "pear",
    "kiwi",
    "banana",
    "grape",
    "strawberry",
    "grapefruit",
    "melon",
    "mango",
    "plum"
  ];

  formGroup: FormGroup;

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  website;
  phone;

  // steps = [
  //   {label: 'Confirm your name', content: 'Last name, First name.'},
  //   {label: 'Confirm your contact information', content: '123-456-7890'},
  //   {label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV'},
  //   {label: 'You are now done', content: 'Finished!'}
  // ];

  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  // Sample

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
          about: ["", Validators.required]
        }),
        // this.formBuilder.group({
        //   otherServices: [""]
        // }),
        // this.formBuilder.group({
        //   beds: [""],
        //   childcare: ["false"]
          // education:['false'],
          // interview:['false'],
          // jobPlacement:['false'],
          // donations:['false'],
          // food:['false'],
        // })
      ])
    });
  }

  nextStep() {

    console.log(this.formGroup.value.formArray);

  }
}
