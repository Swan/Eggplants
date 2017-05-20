import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RegisterService } from './register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private submitted: boolean;

  // All possible errors when signing up
  private differentPasswords: boolean;
  private usernameTaken: boolean;
  private emailTaken: boolean;
  private shortPassword: boolean;
  private badPassword: boolean;

  constructor(private registerService: RegisterService) { 
    this.registerForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.registerService.registerUser(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password);
  }

}
