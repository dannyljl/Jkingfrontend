import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.updatelocal();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public updatelocal(){
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  update(user: User) {
    return this.http.post<User>(`${environment.authUrl}/user/update`, user, httpOptions)
      .pipe(map(receivedUser => {
        console.log('updated user =' + receivedUser);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(receivedUser));
        this.updatelocal();
        return receivedUser;
      }));
  }

  login(username, password) {
    return this.http.post<any>(`${environment.authUrl}/users/login`, { username, password}, httpOptions)
      .pipe(map(receivedUser => {
        console.log(receivedUser);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(receivedUser));
        this.currentUserSubject.next(receivedUser);
        return receivedUser;
      }));
  }

  delete(id: number) {
    console.log(id);
    this.http.delete<boolean>(`${environment.authUrl}/user/` + id, httpOptions).pipe(map(worked => {
      console.log(worked);
      console.log('does this pass?');
    }));
    this.logout();
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
