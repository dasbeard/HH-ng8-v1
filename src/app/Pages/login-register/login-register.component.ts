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

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.user$) {
      this.router.navigateByUrl("/OrgAdmin");
    }
  }

  ngOnInit() {
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
