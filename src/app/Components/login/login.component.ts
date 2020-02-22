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
  register:boolean = false;
  
  showLoginError:boolean = false;
  loginError:String = '';

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

  async login(formValues) {
    this.showLoginError=false;

    let temp = await this.authService.signIn(formValues);

    if (temp.data === 'success') {
      // console.log(temp.data);
      this.loginForm.reset();
    } else {
      this.showLoginError = true;
      this.loginError = temp.data;
      this.loginForm.reset({email: formValues.email,password: ''});
    }

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
