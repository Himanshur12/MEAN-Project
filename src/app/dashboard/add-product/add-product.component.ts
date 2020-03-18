import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HeroService } from '../../service/hero.service' ;
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted = false;
  
  productObj:any;

  constructor( private fb : FormBuilder,
     private router:Router,
     private addsuser: HeroService,
     private dataService: DataService,
     private msg: ToastrService,
     private newService: HeroService
     ) { }
  profileForm = this.fb.group ({
    productName: ['', [Validators.required,Validators.minLength(4)]],

    productDescription: ['', [Validators.required,Validators.minLength(4)]],

    productImage: ['', [Validators.required,Validators.minLength(4)]]

  }
  
  );
  

  get f() { return this.profileForm.controls; }


  get productName() { return this.profileForm.get('productName'); }

  get productDescription() { return this.profileForm.get('productDescription'); }

  get productImage() { return this.profileForm.get('productImage'); }
 
  onRegister(profileForm) {
    this.submitted = true;
        if (this.profileForm.invalid) {
          return this.msg.info('Fill All Details!');
            // return alert('Fill All Details!');
        }
        else {
          var data=profileForm.value;
            var udata={
              p_name:data.productName,
              p_desc:data.productDescription,
              p_image : data.productImage
          }
          console.log(udata);
        this.addUser(udata);
        this.router.navigateByUrl('/dashboard/product');
        }
  }

  addUser = (data) => {
    this.addsuser.addProduct(data).subscribe((res)=>{
     
    this.msg.success(res.message);
    })
}

updateProduct()
{
  this.newService.updateProduct(this.productObj)
      .subscribe(res=> {

        this.router.navigateByUrl('/dashboard/product');
        this.msg.success(res.message);
        
      })
} 
 ngOnInit(): void {

    this.dataService.currentData
    .subscribe(res=> {
      console.log(res);
      this.productObj = {
        _id: res._id,
        p_name: res.p_name,
        p_desc: res.p_desc,
        p_image: res.p_image
      }
    })    
  }
}
