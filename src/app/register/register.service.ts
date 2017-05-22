import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterService {

  public isRegistered: boolean;
  public signupError: string;

  constructor(private http: Http) {
    this.isRegistered = false;
    this.signupError = 'None';
   }

  // Responsible for registering the user.
  registerUser(username: string, email: string, password: string) {

    let body = JSON.stringify({ username: username, email: email, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('/api/users/new', body, options)
    .subscribe(
      response => {
        let data = response.json();
        console.log(data);

        // If there is an error, set a sign up error to be used in the DOM
        if (data && !data.ok) {
          try {
            this.signupError = 'There was a problem with your sign up. Please check the details you have entered and try again!';
            if (data.message && data.message == "The password provided is too short") this.signupError = 'Passwords must be at least 6 characters';
            if (data.message.errmsg && data.message.errmsg.includes('$username_1 dup key')) this.signupError = 'That username has already been taken!';
            if (data.message.errmsg && data.message.errmsg.includes('$email_1 dup key')) this.signupError = 'That email has already been used!';
            if (data.message.errors.username.message && data.message.errors.username.kind == 'minlength') this.signupError = 'Usernames must be between 3 and 15 characters!';
            if (data.message.errors.username.message && data.message.errors.username.kind == 'maxlength') this.signupError = 'Usernames must be between 3 and 15 characters!';
            if (data.message.errors.username.message && data.message.errors.username.message == 'Invalid Username') this.signupError = 'Invalid username given!'
          } catch (e) {
            console.log("Something went wrong with the registration");
          }
        }
        // For successful registration
        if (data && data.status == 200 && data.ok == true) this.isRegistered = true;
      }
    );

  }

}
