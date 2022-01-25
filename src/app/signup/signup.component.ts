import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  public signupObj = new UserModel();
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:["", Validators.required],
      mobile:["",Validators.required],
      username:["",Validators.compose([Validators.required,Validators.email])],
      password:["",Validators.required]
    })
  }

  signUp()
  {
    console.log(this.signupForm.value.password);
    this.signupObj.FullName = this.signupForm.value.fullname; 
    this.signupObj.Mobile = this.signupForm.value.mobile; 
    this.signupObj.UserName = this.signupForm.value.username; 
    this.signupObj.Password = this.signupForm.value.password; 

    console.log(this.signupObj);
    this.api.signUp(this.signupObj)
    .subscribe(res => {
      alert("Signed up successfull");
      this.signupForm.reset();
      this.router.navigate(["login"]);
    });
  }

}
