import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthorizationComponent } from '../components/user-authorization/user-authorization.component';
import { UserDataManagerService } from './user-data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private userData: UserDataManagerService,
  private router: Router) { }

  public gotoMain(){
    if(true){
      this.router.navigate(['main']);
    } 
  }

  public gotoUser(){
    this.router.navigate(['user']);
  }

  
}
