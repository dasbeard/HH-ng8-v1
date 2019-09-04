import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  logIn:boolean = true;
  register:boolean = false;
  message='temp';


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.loggedIn = this.authService.isLoggedIn();

    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/OrgAdmin");
    }

  }

  registerPage($event) {
    this.logIn = false;
    this.register = true;
  }

  loginPage($event) {
    this.logIn = true;
    this.register = false;
  }



}
