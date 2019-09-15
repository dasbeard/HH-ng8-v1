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
  uid: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private regService: RegistationService
  ) {
    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user.registering) {
        this.router.navigate([`OrgAdmin/${user.uid}`]);
        // console.log("user already in system");
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
