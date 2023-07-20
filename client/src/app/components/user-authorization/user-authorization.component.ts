import { Component, OnInit } from '@angular/core';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import {NgModel} from "@angular/forms"
import { UIService } from 'src/app/services/ui.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css']
})
export class UserAuthorizationComponent implements OnInit {

  public isRegister:boolean = false;

  public username: string = "";
  public pass: string = "";
  public gender: string = "male";
  public region: string = "europe";
  public education: string = "littlenone";
  public employment: string ="unemployed";
  public errorInfo: boolean = false;

  constructor(private authServise: UserDataManagerService,
              private uiService: UIService) { }

  ngOnInit(): void {
  }

  public setState(state: number){
      if(state==1)
        this.isRegister = false;
      else
        this.isRegister = true;
      
      this.errorInfo = false;
  }

  public register(){
    this.authServise.register(this.pass, this.username, this.gender, this.education, this.employment, this.region).pipe(
      tap((res: any)=>{
      if(res.status == 200){
        this.uiService.gotoMain();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      this.errorInfo = true;

      return of(null)
    })).subscribe();
  }

  public login(){
    this.authServise.login(this.pass, this.username).pipe(
      tap((res: any)=>{
      if(res.status == 200){
        this.uiService.gotoMain();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      this.errorInfo = true;

      return of(null)
    })).subscribe();
  }

}
