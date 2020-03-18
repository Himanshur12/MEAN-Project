import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../../service/hero.service' 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  registerForm: FormGroup;
    submitted = false;
    user : any;
    constructor(
      private formBuilder: FormBuilder,
      private router : Router,
      private adduser : HeroService,
      private myuser : HeroService,
      private deleteUser : HeroService,
      private msg:ToastrService,
      private dataService: DataService) { }
    ngOnInit() {
      this.getUsers();
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          Address: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
      });
  }

  // convenience getter for easy access to form fields
  getUsers = () => {
    this.adduser.getUser().subscribe((res)=> {
      this.user=res;

    })
  }

  get name() { return this.registerForm.get('name'); }

  get Address() { return this.registerForm.get('Address'); }

  get email() { return this.registerForm.get('email'); }

  get f() { return this.registerForm.controls; }

  showToaster() {
    this.msg.success('User Added Successfully !','User')
}
 

  onSubmit() {
      this.submitted = true;
      console.warn(this.registerForm.value);

      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! \n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }


  delUser(id:any) {
  
    this.deleteUser.deleteUser(id).subscribe((res)=>{
    
       this.adduser.getUser().subscribe((res)=> {
        this.user=res;

        this.msg.success("User Deleted");
      })
     });
  }

  getUserdata(id:any) {
    this.myuser.getUserById(id).subscribe((res)=>{
     this.user = res;
     console.log(this.user);
    })

  }

  updateUser(id,fname,lname,email) {
    console.log(id,fname,lname,email);
    var userData = {
      _id: id,
      first_name: fname,
      last_name: lname,
      email: email
    }
    this.dataService.changeData(userData);
    this.router.navigateByUrl('/dashboard/addUser/'+id);
  }

}

