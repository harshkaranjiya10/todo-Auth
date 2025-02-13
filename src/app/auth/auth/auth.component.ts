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
import { Task } from 'zone.js/lib/zone-impl';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input'; 

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, LoadingComponent, CommonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule],
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
    personalForm: new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      city: new FormControl(''),
      dob: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl<'Male' | 'Female' | 'Prefer Not to say'>("Male"),
    })
  });

  onSubmit(form: FormGroup) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const personalDetails = form.value.personalForm;
    
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      resData => {
        //let tasks: Task[]

        if(this.isLogin) {
          let oldUsers = JSON.parse(localStorage.getItem('users') || '[]');
          const found = oldUsers.find((user: any)=>{
            user.resData.email === email
          })
          /* if(found) {} */
        this.isLoading = false;
        this.router.navigate(['/tasks']);
        } else {
          let oldUsers = JSON.parse(localStorage.getItem('users') || '[]');
          oldUsers.push({ resData, personalDetails });
          localStorage.setItem('users', JSON.stringify(oldUsers));
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/tasks', ]);
        }
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
    localStorage.removeItem('userData');
  }
}
