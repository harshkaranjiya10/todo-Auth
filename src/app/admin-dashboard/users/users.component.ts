import { Task } from '../../tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../tasks/tasks.service';
import { TaskComponent } from '../../tasks/task/task.component';
import { AuthResponseData } from '../../auth/auth/auth.service';

import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DobFormatPipe } from '../../pipes/dob-format.pipe';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 


export interface Personal {
  username: string;
  city: string;
  dob: string;
  phone: string;
  gender: string;
  email: string;
}
export interface User {
  resData: AuthResponseData;
  personalDetails: Personal;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements AfterViewInit {
  tasks: Task[] = [];
  users: User[] = [];
  personal: Personal[] = [];
  selectedUser: Personal | null = null;
  private _liveAnnouncer = inject(LiveAnnouncer);
  gender: string[] = ['Male', 'Female'];

  constructor(private tasksService: TasksService, private router: Router) {
    const storedTasks = localStorage.getItem('tasks');
    const storedUsers = localStorage.getItem('users');

    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    this.tasksService.tasksSubject.subscribe((tasks) => {
      this.tasks = tasks;
    });
    console.log('Users fetched from localStorage:', this.users);
    if (this.users.length === 0) {
      console.log('No users found in localStorage.');
    } else {
      console.log('Users found:', this.users);
    }

    console.log(this.users);

    this.users.forEach((user) => {
      this.personal.push(user.personalDetails);
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /* onClick(user: User) {
    this.selectedUser = user;
    this.tasks = this.tasksService.getTasksId(user.resData.email);
    console.log(this.tasks);
    console.log('selectedUser :');
    console.log(this.selectedUser);
  } */
  displayedColumns: string[] = [
    'profile',
    'email',
    'username',
    'phone',
    'city',
    'gender',
    'dob',
  ];
  dataSource = new MatTableDataSource(this.personal);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    /* this.dataSource.filter = filterValue.trim().toLowerCase(); */
    this.dataSource.filterPredicate = (data: Personal, filter: string) => {
      return (
        data.email.toLowerCase().includes(filter) ||
        data.username.toLowerCase().includes(filter) ||
        data.phone.toLowerCase().includes(filter) ||
        data.city.toLowerCase().includes(filter)
      );
    };
    
    this.dataSource.filter = filterValue;
  }
  selectedRow = false;
  onRowClick(user: Personal) {
    this.selectedRow = !this.selectedRow;
    if(this.selectedRow){
      console.log(user);
      let userId = user.email;
      this.selectedUser = user;
      this.tasks = this.tasksService.getTasksId(this.selectedUser.email);
      this.tasksService.tasksSubject.pipe(
        map(tasks => tasks.filter(task => task.userId === userId))
      ).subscribe(filteredTasks => {
        this.tasks = filteredTasks;
        console.log(this.tasks);
      });
      console.log(this.tasks);
      this.tasks = this.tasksService.getTasksId(this.selectedUser.email);
      this.router.navigate(['/admin-tasks', this.selectedUser.email]);
    } else {
      this.selectedUser = null;
    }
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onGenderChange(gender: string) {
    console.log(gender);
  
    if (gender === 'Male' || gender === 'Female' || gender === 'Prefer Not to say') {
      this.dataSource.data = this.personal.filter(user => user.gender === gender);
    } else {
      this.dataSource.data = this.personal;
    }
  }
  
  onDateChange(date: string) {
    console.log("Selected Date:", date);
  
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); 
      console.log("Formatted Date:", formattedDate);
  
       const filter = this.personal.filter(user => {
        const userDob = new Date(user.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return userDob === formattedDate;
      });

      if(filter) {
        this.dataSource.data = filter;
      } else {
        
      }
    } else {
      this.dataSource.data = this.personal;
    }
  }
  
}