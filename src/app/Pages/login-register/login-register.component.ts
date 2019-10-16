import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { RegistationService } from "src/app/Services/registation.service";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  logIn: boolean = true;
  register: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) // private regService: RegistationService
  {
    const userJSON = JSON.parse(localStorage.getItem("user"));

    if (userJSON != null) {
      if (!userJSON.registering) {
        this.router.navigate([`OrgAdmin/${userJSON.uid}`]);
      }
    }

  }

  ngOnInit() {}

  registerPage($event) {
    this.logIn = false;
    this.register = true;
  }

  loginPage($event) {
    this.logIn = true;
    this.register = false;
  }
}
