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
          username: this.validateForm.controls.userName.value,
          password: this.validateForm.controls.password.value,
          grant_type: "password"
        }).subscribe((response: any) => {
          console.log(response);
          if (response.access_token) {
            localStorage.clear();
            const token = response.token_type + " " + response.access_token;
            localStorage.setItem("token", token);
            //获取菜单栏
            let url = API.config.suffix !== '' ? API.local["plans"] + API.config.suffix : API.local["plans"];
            url = "/api" + url;
            this.http.get(url).subscribe((menuData: any) => {
              console.log(menuData);
              localStorage.setItem("plans", JSON.stringify(menuData));
            })

            let urlNodes = API.config.suffix !== '' ? API.local["nodes"] + API.config.suffix : API.local["nodes"];
            urlNodes = "/api" + urlNodes;
            this.http.get(urlNodes).subscribe((menuData: any) => {
              console.log(menuData);
              localStorage.setItem("nodes", JSON.stringify(menuData));
              let nodeStatus: any[] = localStorage.getItem("nodeStatus") ? JSON.parse(localStorage.getItem("nodeStatus")) : [];
              let nodeMessage: any[] = localStorage.getItem("nodeMessage") ? JSON.parse(localStorage.getItem("nodeMessage")) : [];
              menuData.forEach(node => {
                const { id } = node;
                nodeStatus.push({ id, status: 3 });
                nodeMessage.push({ id, message: [], log: [] });
              });
              localStorage.setItem("nodeStatus", JSON.stringify(nodeStatus));
              localStorage.setItem("nodeMessage", JSON.stringify(nodeMessage));
            })

            this.http.get("/api" + API.local.user).subscribe((data: any) => {
              console.log(data);
              localStorage.setItem("userInfo", JSON.stringify(data));
            });
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
      userName: ["ganghang@ganghang.com", [Validators.required]],
      password: ["647da135", [Validators.required]]
    });
  }
}
