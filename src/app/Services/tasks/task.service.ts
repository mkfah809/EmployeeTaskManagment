import { Injectable } from '@angular/core';
import { environment } from '../../../Environments/enviornment.dev';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../Models/task';
import { Observable } from 'rxjs';
import { Employee } from '../../../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task, employeeIds: number[]): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { ...task, employeeIds });
  }

  getEmployeesByTaskId(taskId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/${taskId}/employees`);
  }

  assignEmployeeToTask(taskId: number, employeeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${taskId}/assign-employee`, { employeeId });
  }



}
