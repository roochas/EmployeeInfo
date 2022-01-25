import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public employeeAPIUrl : string = "https://localhost:44315/api/Employee/";
  public loginAPIUrl : string = "https://localhost:44315/api/Login/";
  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>(`${this.employeeAPIUrl}CreateEmployee`,data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  
  getEmployee(){
    return this.http.get<any>(`${this.employeeAPIUrl}GetAllEmployees`)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  updateEmployee(data : any)
  {
    return this.http.put<any>(`${this.employeeAPIUrl}UpdateEmployeeInfo`,data)
    .pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  deleteEmployee(EmpId: any){
    return this.http.delete<any>(`${this.employeeAPIUrl}RemoveEmployee/${EmpId}`)
    .pipe(map((res: any) => {
       return res; 
    }))
  }

  signUp(empObj : any)
  {
    return this.http.post<any>(`${this.loginAPIUrl}SignUp`,empObj);
  }

  login(empObj: any)
  {
    console.log(empObj);
    return this.http.post<any>(`${this.loginAPIUrl}login`,empObj);
  }
}



/*
      For local JSON API

        //post Employee
         postEmployee(data: any) {
          return this.http.post<any>("http://localhost:3000/posts",data)
          .pipe(map((res:any) => {
            return res;
          }))
        }

        //get employee
        getEmployee(){
          return this.http.get<any>("http://localhost:3000/posts")
          .pipe(map((res:any) => {
            return res;
          }))
        }

        //update employee
        updateEmployee(data : any, id: number)
        {
          return this.http.put<any>("http://localhost:3000/posts/"+id,data)
          .pipe(map((res:any) => {
            return res;
          }))
        }        

        //delete employee
        deleteEmployee(id: number){
          return this.http.delete<any>("http://localhost:3000/posts/"+id)
          .pipe(map((res: any) => {
            return res; 
          }))
        }

*/