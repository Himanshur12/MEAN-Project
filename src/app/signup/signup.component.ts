import { Component, OnInit } from '@angular/core';
// import { SignupModule } from './signup.module';
import { FormGroup, FormBuilder,Validators,FormArray,FormControl } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  // registerForm: FormGroup;
    submitted = false;
  


  constructor( private fb : FormBuilder, private router:Router) { }
  profileForm = this.fb.group ({
    name: ['', [Validators.required,Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]]

  }
  // { Validator : this.mustMatch }
  );
  // mustMatch( getdata: FormGroup) {
  //   return getdata.controls['password'].value === 
  //   getdata.controls['confirm_password'].value ? null : {'mismatch': true};
  //       }
  //    get f2() { 
  //       return this.profileForm.controls; 
  //     }

  get f() { return this.profileForm.controls; }


  get name() { return this.profileForm.get('name'); }
        
  get email() { return this.profileForm.get('email'); }

  get password() { return this.profileForm.get('password'); }

  get confirm_password() { return this.profileForm.get('confirm_password'); }
  

  onSubmit() {
    console.warn(this.profileForm.value);
    this.submitted = true;

        if (this.profileForm.invalid) {
            return ;
        }
        else {
          this.router.navigateByUrl('/login');
        }
  }

      

  ngOnInit(): void {

    
  }

}

