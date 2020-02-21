import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hidePass: boolean = true;

  loginForm: FormGroup;
  // isSubmitted = false;

  register:boolean = false;

  @Output() registerNewClient = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

  }

  get formControls() {
    return this.loginForm.controls;
  }

  login(values) {
    // console.log(values);
    // if (this.loginForm.invalid) {
    //   this.loginForm.reset();
    //   return;
    // }
    this.authService.signIn(values);
  }

  newClient() {
    this.registerNewClient.emit(true);
  }
  
  getErrorMessage() {
    return  this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
    this.loginForm.controls.email.hasError('email') ? 'Not a valid email' :
    '';
  }
}
