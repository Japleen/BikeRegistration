import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as Auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  Auth0 = new Auth0.WebAuth({
    clientID: 'ip5wgXwV9nOoVM3LMuhsVMXR5rOrDmK1',
    domain: 'japleen.auth0.com',
    responseType: 'token id_token',  
    audience: 'http://localhost:8080',
    redirectUri:'http://localhost:4200/callback',
    scope: 'openid view:registration view:registrations'
  });

  constructor(public router:Router) { }

  public login() : void{
    this.Auth0.authorize();
  }

  public handleAuthentication() : void{
    this.Auth0.parseHash((err, authresult)=>{
      if(authresult && authresult.accessToken && authresult.idToken){
        window.location.hash = '';
        this.setSession(authresult);
        this.router.navigate(['/admin']);
      }
      else if (err){
        this.router.navigate(['/admin']);
        console.log('/err');
      }
    });
    }

    private setSession(authresult): void {
      const expiresAt = JSON.stringify ((authresult.expiresIn *1000) + new Date().getTime());
      localStorage.setItem('access_token', authresult.accessToken);
      localStorage.setItem('id_token', authresult.idToken);
      localStorage.setItem('expires_at', expiresAt);
  }

  public logout() :void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  public isAuthenticated() :boolean{
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime()< expiresAt;
  } 
}
