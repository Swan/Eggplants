import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  // Responsible for registering the user.
  registerUser(username: string, email: string, password: string) {

    let body = JSON.stringify({ username: username, email: email, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('/api/users/new', body, options)
    .subscribe(
      response => {
        let data: JSON = response.json();
        console.log(data);
        console.log(`${username} has successfully signed up!`)
      }
    );

  }

}
