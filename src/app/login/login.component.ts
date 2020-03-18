import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from '../service/hero.service' ;
import { ToastrService } from 'ngx-toastr';
import {  CookieService} from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  user:any;
  
  constructor( private fb : FormBuilder,
     private router:Router,
     private getdata : HeroService,
     private login : HeroService,
     private msg :ToastrService,
     private cookie : CookieService
     ){ }

    profileForm = this.fb.group ({
    email: ['', [Validators.email,Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email() { return this.profileForm.get('email'); }

  get password() { return this.profileForm.get('password'); }
        
  onSubmit() {

  
  // this.getUsers();
    // console.warn(this.profileForm.value);
    this.submitted = true;

        if (this.profileForm.invalid) {
            return  this.msg.info("Fill Form !","Information");
        }
        else {

            let formData = this.profileForm.value;
            var userData = {
              email : formData.email,
              password : formData.password
            }
      
            this.login.loginUser(userData).subscribe((res)=>{
          
              this.login.getUserr(res.token).subscribe((resp)=>{
                console.log(resp)
                this.cookie.set('id',resp.data[0]._id);
                this.router.navigateByUrl('/dashboard');
                this.msg.success(res.message);
               
              })
            });
               
               
              }
   
  }


  ngOnInit(): void {
  
    
  
  }

}
