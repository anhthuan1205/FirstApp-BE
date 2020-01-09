import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    document.cookie = TOKEN_KEY + '=' + token;
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getTokenCookies(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}
