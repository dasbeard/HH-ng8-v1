import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { User } from "../../Models/user";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  hidePass = true;

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl("/OrgAdmin");
    }

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.reset();
      return;
    }
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl("/OrgAdmin");
  }

  register() {
    console.log("Register New User");
    // this.router.navigateByUrl('/OrganizationPage');
  }

  // getErrorMessage() {
  //   // !! Not Currently being Used
  //   return  this.email.hasError('required') ? 'You must enter a value' :
  //           this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
}
