import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';

import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1/auth`;


  private user = new BehaviorSubject<User | null>(null);
  $user = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response =>  this.tokenService.seveToken(response.access_token))
    )
  }

  // profile(token: string) {
  //   return this.http.get<User>(`${this.apiUrl}/profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-type': 'application/json',
  //     },
  //   });
  // }

  getProfile() {
    return this.http
      .get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      )
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(() => this.getProfile())
      );
  }


  logout(){
    this.tokenService.removeToken()
  }

}
