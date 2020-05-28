import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  update(user: User) {
    return this.http.put<any>('http://localhost:8080/user', user, httpOptions)
      .pipe(map(receivedUser => {
        console.log(receivedUser);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(receivedUser));
        this.currentUserSubject.next(receivedUser);
        return receivedUser;
      }));
  }

  login(username, password) {
    return this.http.post<any>('http://localhost:8080/login', { username, password}, httpOptions)
      .pipe(map(receivedUser => {
        console.log(receivedUser);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(receivedUser));
        this.currentUserSubject.next(receivedUser);
        return receivedUser;
      }));
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
