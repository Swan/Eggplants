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

  private username: string;
  private email: string;
  private password: string;
  private confirmPass: string;

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
    this.registerService.registerUser(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password);
    this.registerForm.reset();
  }

}
