import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import API from "../../API.js"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormBuilder, HttpClient]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid == false) {
      this.http.post("/api/oauth/token",
        {
          client_id: API.config.client_id,
          client_secret: API.config.client_secret,
          // username: this.validateForm.controls.userName.value,
          // password: this.validateForm.controls.password.value,
          username: "ganghang@ganghang.com",
          password: "647da135",
          grant_type: "password"
        }).subscribe((response: any) => {
          console.log(response);
          if (response.access_token) {
            localStorage.clear();
            const token = response.token_type + " " + response.access_token;
            localStorage.setItem("token", token);
            //跳转到主页
            this.router.navigate(["home"]);
          }
        })
    }
  }
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
