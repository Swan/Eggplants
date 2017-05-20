import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('currentUser');
    return location.reload();
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) 
      return true;
    else
      return false;
  }

  isAdmin() {}

}
