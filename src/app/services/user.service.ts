import {User} from '../model/User';

﻿import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:8080/users', httpOptions);
  }

  register(user: User) {
    return this.http.post(`http://localhost:8080/register`, user, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8080/users/${id}`, httpOptions);
  }
}
