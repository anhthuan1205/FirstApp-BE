import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  message: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService, private tokenStorage: TokenStorageService) {
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loginForm.patchValue({
      email: 'info@example.com'
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.tokenStorage.saveToken(this.tokenStorage.getTokenCookies());
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const {value} = this.loginForm;
      console.log(value);
      this.authService.attemptAuth(value)
        .subscribe(next => {
          console.log(next);
          this.tokenStorage.saveToken(next.accessToken);
          this.message = 'Thành công';
        }, error => this.message = 'Lỗi đăng nhập, sai email hoặc mật khẩu, vui lòng nhập lại'); }
  }
  logout() { this.tokenStorage.signOut(); this.message = 'Bạn đã đăng xuất';
  }
}
