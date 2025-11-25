import { Routes } from '@angular/router';
import { HomePageComponent } from '../Components/home/home-page/home-page.component';
import { EmployeeListComponent } from '../Components/employee-table/employee-table.component';
import { EmployeeFormComponent } from '../Components/employee-form/employee-form.component';
import { EmployeeTaskComponent } from '../Components/employee-task/employee-task/employee-task.component';
import { TaskListComponent } from '../Components/task-table/task-table/task-table.component';
import { TaskFormComponent } from '../Components/task-form/task-form.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create/employee', component: EmployeeFormComponent },
  { path: 'employees/:id/edit', component: EmployeeFormComponent },
  { path: 'employees/:id/tasks', component: EmployeeTaskComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: 'tasks/:id/employees', component: EmployeeListComponent },
  { path: '**', redirectTo: '' } // Redirect to home if path not found
];