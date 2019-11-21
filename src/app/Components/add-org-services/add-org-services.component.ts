import { Component, OnInit } from "@angular/core";
import { RegistationService } from "src/app/Services/registation.service";
import { User } from "src/app/Models/user";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-add-org-services",
  templateUrl: "./add-org-services.component.html",
  styleUrls: ["./add-org-services.component.scss"]
})
export class AddOrgServicesComponent implements OnInit {
  user: User;

  servicesFormGroup: FormGroup;
  otherServicesFormGroup: FormGroup;
  bedsAvailableFormGroup: FormGroup;
  getBedCount: boolean= false;

  constructor(
    private regService: RegistationService,
    private formBuilder: FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.servicesFormGroup = this.formBuilder.group({
      beds: [false],
      childcare: [false],
      education: [false],
      interviewPrep: [false],
      jobPlacement: [false],
      donations: [false],
      servesFood: [false]
    });
    this.otherServicesFormGroup = this.formBuilder.group({
      otherServices: [""]
    });
    this.bedsAvailableFormGroup = this.formBuilder.group({
      bedsAvailable: [0]
    });
  }

  checkBeds(value){
    this.getBedCount = value  
  }


  addServices() {
    this.regService.addUserServices(
      this.servicesFormGroup.value,
      this.otherServicesFormGroup.value.otherServices,
      this.bedsAvailableFormGroup.value.bedsAvailable
    );
  }
}
