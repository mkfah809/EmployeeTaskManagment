import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { FormsModule, NgModel } from '@angular/forms';
import { EmployeeService } from '../../app/Services/employees/employee.service';
import {Router, ActivatedRoute} from '@angular/router'; // ActivatedRoute used for to pass parameters to other URL. 
import { CommonModule } from '@angular/common'; // used for let me use template in the html

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})

// we called the interace and implement all the attributes
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { 
    id: 0, 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    position: '', 
    tasks: [] };
    employees: Employee[] = [];
  isUpdate: boolean = false;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const employeeId = +this.route.snapshot.paramMap.get('id')!;
    if (employeeId) {
      this.isUpdate = true;
      this.employeeService.getEmployee(employeeId).subscribe(data => {
        this.employee = data;
      });
    }
  }


  createEmployee(): void {
      this.employeeService.createEmployee(this.employee).subscribe({
        next: (response) => {
            console.log('Employee created successfully:', response);
            this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating employee:', err)
    });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== employeeId);
    });
  }

  getTasksByEmployeeId(employeeId: number): void {
    this.router.navigate(['/employees', employeeId, 'tasks']);
  }

  saveEmployee(): void {
    if (this.isUpdate) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

}

