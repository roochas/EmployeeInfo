import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  formValue !: FormGroup; 
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      designation: [''],
    })

    this.getAllEmployee();
  }


  //To reset the form
  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }



  //Post data to api
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.employeeModelObj.designarion = this.formValue.value.designation;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=> {
        console.log(res);
        alert("Employee Added successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
    },
    err=> {
      alert("Something went wrong");
    })  
  }

  //get all employees from api
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res;
    })
  }

  //To delete record
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.employeeId)
    .subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  //To edit the record
  onEdit(row: any){
    this.employeeModelObj.employeeId = row.employeeId;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['dateOfBirth'].setValue(formatDate(row.dateOfBirth,'yyyy-MM-dd', 'en'));
    this.formValue.controls['designation'].setValue(row.designarion);

    this.showAdd = false;
    this.showUpdate = true;
  }

  //To update employee
  updateEmployeeDetails()
  {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.employeeModelObj.designarion = this.formValue.value.designation;

    this.api.updateEmployee(this.employeeModelObj)
    .subscribe(res=>{
      alert("Updated Successfully");
      document.getElementById("cancel")?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  //Logout
  clickLogout()
  {
    localStorage.removeItem('token');
  }
 
}
