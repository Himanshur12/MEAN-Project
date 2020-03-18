import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray,FormControl } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../service/hero.service' ;
import { getDefaultService } from 'selenium-webdriver/edge';
import {ToastrService} from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  submitted = false;
  _id:string;
  flag:boolean = true;
userObj:any;
user :any;
editForm : any;
  constructor( private fb : FormBuilder,
    private myuser : HeroService, 
    private router:Router,
    private addsuser: HeroService,
    private msg: ToastrService,
    private dataService: DataService,
    private activateRoute : ActivatedRoute,
    private newService: HeroService ) { 

      this._id = this.activateRoute.snapshot.params["_id"];

      

      if(this._id==undefined){
        this.flag=true;
      }
      else {
        this.flag=false;
      }
    }
  profileForm = this.fb.group ({
    name: ['', [Validators.required,Validators.minLength(4)]],
    lastname: ['', [Validators.required,Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]]

  }
  
  );
  
  editform = this.fb.group ({
    name: ['', [Validators.required,Validators.minLength(4)]],
    lastname: ['', [Validators.required,Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]]

  }
  
  );



  get f() { return this.profileForm.controls; }


  get name() { return this.profileForm.get('name'); }
  get lastname() { return this.profileForm.get('lastname'); }
        
  get email() { return this.profileForm.get('email'); }

  get password() { return this.profileForm.get('password'); }

  get confirm_password() { return this.profileForm.get('confirm_password'); }
  

  onRegister(profileForm) {
    this.submitted = true;
        if (this.profileForm.invalid) {
      return this.msg.info('Fill All Details!');
        }
        else {
          var data=profileForm.value;
            var udata={
            first_name:data.name,
            last_name:data.lastname,
            email:data.email,
            password : data.password
          }
          
        this.addUser(udata);
        this.router.navigateByUrl('/dashboard/user');
        }
  }

  addUser = (data) => {
    this.addsuser.addUser(data).subscribe((res)=>{
     
    this.msg.success(res.message);
    })
}
      

getUserdata(id:any) {
  this.myuser.getUserById(id).subscribe((res)=>{
   this.user = res;
   console.log(this.user);
  })

}

editUser(editform){
  this.submitted=true;
  if(editform.invalid) {
    return this.msg.error("Fill User Details");
    
  }
  else {
    var pdata = editform.value;
    var data = {
      first_name : data.name,
      last_name : data.lastname,
      email : data.email,
      password : data.password
    }
    console.log(this.addUser(data));
  }
}

updateUser()
{
  this.newService.updateUser(this.userObj)
      .subscribe(res=> {

        this.router.navigateByUrl('/dashboard/user');
        this.msg.success(res.message);
        
      })
} 

  ngOnInit(): void {
    this.dataService.currentData
    .subscribe(res=> {
      this.userObj = {
        _id: res._id,
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email
      }
    })    
  }

}
