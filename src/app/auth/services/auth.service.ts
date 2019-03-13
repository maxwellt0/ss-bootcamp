import { Injectable } from '@angular/core';
import { DEFAULT_USERS } from '../default-users';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);

  defaultUsers = DEFAULT_USERS;

  constructor() {
  }

  initUser() {
    if (sessionStorage.getItem('user')) {
      this.setIsLoggedIn(true);
    }
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const loggedInUser = this.defaultUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    return of(loggedInUser).pipe(
      timeout(500),
      map(response => {
        if (response) {
          sessionStorage.setItem('user', JSON.stringify(loggedInUser));
          this.setIsLoggedIn(true);
        }
        return response;
      })
    );
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn$.next(!!value);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  getIsLoggedInValue(): boolean {
    return this.isLoggedIn$.getValue();
  }


  logout() {
    sessionStorage.clear();
    this.setIsLoggedIn(false);
  }

  getUser(): any {
    const userJson = sessionStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAdmin(): boolean {
    return this.getUser() !== null && this.getUser().role === 'admin';
  }
}
