import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegister} from '../interface/i-register';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly API_URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }
  createAcc(user: Partial<IRegister>): Observable<IRegister> {
    return this.http.post<IRegister>(`${this.API_URL}/register`, user);
  }
}
