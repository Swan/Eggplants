import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private http: Http, private router: Router) { }

  login(username: string, password: string) {

    let body = JSON.stringify({ username: username, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('/api/users/login', body, options)
      .subscribe(
        (response) => {
          let user = response.json();
          // Store the received token in local storage to keep the user authenticated between pages 
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            this.router.navigate(['/']);
          } 
        }
      )
  }

  // Remove the token from local storage to log the user out
  logout() {
    localStorage.removeItem('currentUser');
  }

}
