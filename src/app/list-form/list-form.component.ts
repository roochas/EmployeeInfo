import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

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
      email: [''],
      mobile: [''],
      salary: ['']
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



  //Post data to json server
  postEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

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
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  //To edit the record
  onEdit(row: any){
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstname);
    this.formValue.controls['lastName'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);

    this.showAdd = false;
    this.showUpdate = true;
  }

  //To update employee
  updateEmployeeDetails()
  {
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      document.getElementById("cancel")?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
