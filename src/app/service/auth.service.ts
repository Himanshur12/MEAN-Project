import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import { HeroService } from './hero.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

public isLoggedIn : boolean = false;
public redirectUrl : string;

  constructor(private router: Router,
    private user : HeroService,
    private msg  : ToastrService
    ) { }

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable <boolean> {


    this.router.navigate(['/']);
    console.log("You are Unauthorized");
    return this.user.getUser();

  }

}

