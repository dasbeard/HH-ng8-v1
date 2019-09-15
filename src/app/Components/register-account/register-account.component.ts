import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "../../Services/auth.service";
import { GeolocationService } from "src/app/Services/geolocation.service";

@Component({
  selector: "app-register-account",
  templateUrl: "./register-account.component.html",
  styleUrls: ["./register-account.component.scss"]
})
export class RegisterAccountComponent implements OnInit {
  @Output() goToLogin = new EventEmitter<boolean>();

  hidePass: boolean = true;
  hidePassConf: boolean = true;

  registerForm: FormGroup;
  isSubmitted = false;

  // location;

  constructor(
    private authService: AuthService,
    // private geoLoaction: GeolocationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      organization: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    // console.log(this.registerForm.value);
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.reset();
      return;
    }

    let pass = this.registerForm.get("password").value;
    let confPass = this.registerForm.get("confirmPassword").value;

    let passwordsMatch = this.verifyPasswords(pass, confPass);

    if (passwordsMatch) {
      this.authService.createUser(this.registerForm.value);
    } else {
      alert("Passwords dont match");
    }
  }

  verifyPasswords(password, confirmPassword) {
    // console.log('in pass check');

    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.goToLogin.emit(true);
  }
}
