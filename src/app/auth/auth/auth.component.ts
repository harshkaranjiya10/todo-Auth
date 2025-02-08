import { Component, inject, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, LoadingComponent, CommonModule],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', { validators: Validators.required }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit(form: FormGroup) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/tasks']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    
    form.reset();
  }

  switchMode() {
    this.isLogin = !this.isLogin;
  }
  onLogout() {
    this.authService.logout();
    console.log('Logout');
    this.router.navigate(['/auth']);
  }
}
