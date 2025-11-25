import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../app/Services/employees/employee.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})


export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = { 
    id: 0, 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    position: '', 
    tasks: [] };
    isUpdate: boolean = false;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  createEmployee(): void {
    this.router.navigate(['/create/employee']);
  }

  updateEmployee(employeeId: number): void {
    this.router.navigate(['/employees', employeeId, 'edit']);
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== employeeId);
    });
  }

  getTasksByEmployeeId(employeeId: number): void {
    this.router.navigate(['/employees', employeeId, 'tasks']);
  }

}
