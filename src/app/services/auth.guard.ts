import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {// fires when router gets called{

    canActivate(){
        if(this.authService.isAuthenticated()){
            return true;
        }
        else{
            this.authService.login();
        }
    }
    
    constructor(private authService:AuthService){
  
    }

    
}