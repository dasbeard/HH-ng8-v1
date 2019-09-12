import { Component, OnInit } from '@angular/core';
import { RegistationService } from "src/app/Services/registation.service";
import { User } from "src/app/Models/user";

@Component({
  selector: 'app-add-org-services',
  templateUrl: './add-org-services.component.html',
  styleUrls: ['./add-org-services.component.scss']
})
export class AddOrgServicesComponent implements OnInit {

  user: User;


  constructor(
    private regService: RegistationService,
  ) { 
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
  }

}
