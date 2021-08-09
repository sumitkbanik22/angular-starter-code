import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';

const loggedInUserDetails = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  logout(): Observable<boolean> {
    sessionStorage.removeItem(loggedInUserDetails);
    localStorage.removeItem(loggedInUserDetails);
    return observableOf(true);
  }

  getUserInfo(): Observable<any> {
      const savedCredentials = this.getUser();
      return observableOf(savedCredentials);
  }

  isLogin(): boolean {
      if (localStorage.getItem(loggedInUserDetails) || sessionStorage.getItem(loggedInUserDetails)) {
          return true;
      }
      return false;

  }

  getToken(): any {
      const savedCredentials = this.getUser();
      return savedCredentials && savedCredentials['token'];
  }

  getUserRole(): Observable<any> {
      const savedCredentials =  this.getUser();
      return observableOf(savedCredentials['role']);
  }

  getUserType(): any {
      const savedCredentials =  this.getUser();
      if ( this.isLogin() ) {
          return savedCredentials['role'];
      } else {
          return false;
      }


  }

  private getUser(): any {
      const savedCredentials: any = sessionStorage.getItem(loggedInUserDetails) || localStorage.getItem(loggedInUserDetails);
      return JSON.parse(savedCredentials);
  }
}
