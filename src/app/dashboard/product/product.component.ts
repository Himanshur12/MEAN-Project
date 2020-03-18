import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HeroService } from '../../service/hero.service' ;
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    add=new FormGroup({
        p_name : new FormControl('',[ Validators.required]),
        p_desc : new FormControl('',[ Validators.required]),
        p_image : new FormControl('',[ Validators.required]),

    })


  registerForm: FormGroup;
  submitted = false;
product:any;
  constructor(private formBuilder: FormBuilder,
    private addProduct : HeroService,
    private router : Router,
    private deleteProduct : HeroService,
    private toastr:ToastrService,
    private dataService: DataService) { }
  ngOnInit() {
      this.getProduct();
    this.registerForm = this.formBuilder.group({
        productName: ['', Validators.required],
        productId: ['', Validators.required],
        price: ['', [Validators.required]]
    });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.warn(this.registerForm.value);
    // display form values on success
    alert('SUCCESS!! \n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}



getProduct = () => {
    this.addProduct.getProduct().subscribe(
        (res) =>  { 
        this.product = res.data; }
    );
}

showToaster() {
    this.toastr.success('Product !','Product')
}

updateProduct(pId,pName,pdesc,pImage){
console.log(pId,pName,pdesc,pImage);
var productData = {
    _id : pId,
    p_name : pName,
    p_desc : pdesc,
    p_image : pImage
}
this.dataService.changeData(productData);
this.router.navigateByUrl('/dashboard/addProduct');
}

delproduct(id:any) {
  
    console.log(this.deleteProduct.deleteProduct(id).subscribe((res)=>{
   
      this.deleteProduct.getProduct().subscribe((res)=> {
       this.product=res.data;
       
       this.toastr.success("Product Deleted!");
     })
     this.toastr.success("Product Deleted!");
    }
    
    ));
 }

}

