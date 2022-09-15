import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReposService } from 'src/app/services/repos.service';
import { UserInfo } from 'src/app/models/user.model';
declare let alertify: any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../../app.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  submitted: boolean = false;

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private service: ReposService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      var postData = Object.assign({}, this.loginForm.value);
      this.service.post("api/Auth/Login", postData).subscribe(resp => {
        this.user = resp;
        let userInfo: UserInfo = {
          _id: this.user.id,
          fullname: this.user.fullName,
          username: this.user.userName,
          isDoctor: this.user.isDoctor
        };
        this.submitted = false;
        if(this.user.isDoctor)
        {
          this.router.navigateByUrl('/doctormain/'+ this.user.id);
         alertify.success("Hoşgeldiniz");
        }
        else
        alertify.error("Web sitemiz yalnızca doktorlarımız içindir. Lütfen mobil uygulamamızı deneyiniz.")

      }, error=>{
        alertify.error("Kullanıcı adı veya şifre hatalı!");
      }
      );
    }
  }


}
