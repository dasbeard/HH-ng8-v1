import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/Models/user';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {

  user:User

  constructor() {
    this.user = JSON.parse(localStorage.getItem("user"));  
    // console.log(this.user);
    
  }

  ngOnInit() {
  }

}
